import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError, switchMap } from "rxjs";
import { AuthService } from "../services/authservice/auth.service";

// requete pour refresh token
const API_AUTH_REFRESH = '/api/v1/auth/refresh';


// Fonction utilitaire pour ajouter l'Access Token à la requête
const addToken = (request: HttpRequest<unknown>, token: string) => {
  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`),
  });
};


// Logique de gestion du 401 (Doit être en dehors de la fonction principale)
function handle401Error(request: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<unknown>> {
  
  if (!authService.getAccessToken()) {
    // Si l'Access Token a déjà été effacé par une autre logique (ex: déconnexion locale), 
    // ou si le token est null, on ne tente pas de refresh.
    return throwError(() => new Error('No token available.'));
  }

  // Tenter de rafraîchir le jeton
  return authService.refreshAccessToken().pipe(
    switchMap((response) => {
      // Si le refresh a réussi (response est AuthResponse)
      const newAccessToken = authService.getAccessToken();
      
      if (newAccessToken) {
        // Rejouer la requête initiale avec le nouveau Access Token
        return next(addToken(request, newAccessToken));
      }
      // Cela ne devrait pas arriver si response est bien gérée, mais par sécurité
      return throwError(() => new Error('Token refresh failed to provide new token.')); 
    }),
    catchError((err) => {
      // Si le refresh échoue (ex: Refresh Token expiré, révoqué, ou compromis)
      // L'AuthService a déjà effacé l'état et logué l'erreur
      return throwError(() => err);
    })
  );
}


export const securityInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  const authService = inject(AuthService);
  //const notificationService = inject(NotificationService);
  const token = authService.getAccessToken();

  // 1. Ne pas intercepter les requêtes d'auth (login, refresh)
  const isAuthRequest = request.url.includes('/auth/');

  if (isAuthRequest && !request.url.includes(API_AUTH_REFRESH)) {
    return next(request);
  }

  // 2. Ajouter l'Access Token s'il existe
  if (token) {
    request = addToken(request, token);
  }

  // 3. Traitement des erreurs (y compris le 401)
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // A. Gérer l'erreur 401 et le renouvellement (Rotation du Refresh Token)
      if (error.status === 401) {
        // Si c'est l'endpoint de refresh qui retourne 401, le token est mort. Déconnecter.
        if (request.url.includes(API_AUTH_REFRESH)) {
          authService.logout();
          //notificationService.showError('Session expirée ou compromise. Veuillez vous reconnecter.');
        }
        
        // Sinon, c'est l'Access Token qui est expiré -> Tenter le renouvellement
        return handle401Error(request, next, authService);
      }
      
      // B. Gérer l'erreur 403 (Forbidden)
      if (error.status === 403) {
        //notificationService.showWarning("Accès non autorisé. Vous n'avez pas les permissions requises.");
        // Gérer la redirection vers une page d'accès refusé si nécessaire
      }

      // C. Gérer l'erreur 400 (Bad Request - Erreurs de validation)
      if (error.status === 400 && error.error?.message) {
        // Souvent utilisé pour afficher des erreurs de formulaire
        //notificationService.showWarning(`Erreur de données : ${error.error.message}`);
      }

      // D. Gérer l'erreur 500 (Internal Server Error)
      if (error.status >= 500) {
        //notificationService.showError('Erreur interne du serveur. Veuillez réessayer plus tard.');
      }
      
      // Laisser l'erreur se propager pour la gestion spécifique dans le composant
      return throwError(() => error);
    })
  );
};



// ⚠️ NOTE : Le HttpOnly Cookie pour le Refresh Token est GÉRÉ PAR LE NAVIGATEUR
// L'intercepteur n'a pas besoin de le lire ni de l'envoyer.