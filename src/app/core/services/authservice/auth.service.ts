import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, Optional, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap, throwError, timer } from 'rxjs';
import { roleList, UserProfile } from '../../../models/authmodels/userProfile-model';
import { SecurityAlert } from '../../../models/authmodels/securityAlert-model';
import { Credentials } from '../../../models/authmodels/credentials-model';
import { AuthResponse } from '../../../models/authmodels/authReponse-model';
import { Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { RegisterData } from '../../../models/authmodels/registerData-model';




// URL de base de votre API Spring Boot
const API_AUTH_URL = 'http://localhost:4200/';

// Déclaration du jeton pour éviter l'erreur de compilation
// Cela dit à TypeScript qu'un jeton de ce nom existera.
export const SERVER_REQUEST = new InjectionToken<any>('SERVER_REQUEST');

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Injection des dépendances
  private http = inject(HttpClient);
  private router = inject(Router);

  //  NOUVELLES INJECTIONS SSR
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private isServer = isPlatformServer(this.platformId);

  // Pour accéder à la requête Express et lire les HttpOnly Cookies (uniquement si SSR)
  // Injection utilisant le jeton déclaré ou l'équivalent moderne fourni par Angular CLI
  // Nous utilisons le nom 'SERVER_REQUEST' pour être plus explicite avec l'environnement moderne.
  private request = inject(SERVER_REQUEST, { optional: true });


  // Gère l'état de l'utilisateur (null si déconnecté)
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$: Observable<UserProfile | null> = this.currentUserSubject.asObservable();

  // Simplification pour l'état de connexion
  public isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  // Recuperer la liste des roles
  // Crée un Observable qui émet la liste des rôles (string[]) ou null.
  public userRoles$: Observable<string[] | null> = this.currentUser$.pipe(
      map(user => user ? user.roles : null)
  );


  //Méthode pour récuperer le role de facon synchrone
  public getUserRole(): 'ETUDIANT' | 'TUTEUR' | 'ADMIN' | null {
    const user = this.currentUserSubject.value;
    console.log(user?.roles);
    if (!user || !user.roles || user.roles.length === 0) {
       return null;
    }
    // Logique pour identifier le rôle principal ou vérifier l'existence
    if (user.roles.includes('ADMIN')) return 'ADMIN';
    if (user.roles.includes('TUTEUR')) return 'TUTEUR';
    if (user.roles.includes('ETUDIANT')) return 'ETUDIANT';
    return null;
  }



  //Méthode pour récuperer id utilisateur de facon synchrone
  public getCurrentUserId(): number | null {
    return this.currentUserSubject.value?.id || null;
  }


  // Stockage de l'Access Token en mémoire (pour les appels API)
  private accessToken: string | null = null;
  private tokenExpirationTimer: any;

  // Stockage des alertes reçues
  private securityAlertSubject = new BehaviorSubject<SecurityAlert | null>(null);
  public securityAlert$: Observable<SecurityAlert | null> = this.securityAlertSubject.asObservable();



  constructor() {
    // Tenter de restaurer l'état (si stocké dans sessionStorage/memory)
    this.checkInitialAuthState();
  }


  private checkInitialAuthState(): void {
    // 🎯 CRITIQUE SSR : Tentative de lecture du Refresh Token HttpOnly
    if (this.isServer && this.request) {
      const cookies = this.request.headers['cookie'];
      //Adapter la clé du cookie à ce que votre Backend utilise (ex: 'refresh_token')
      if (cookies && cookies.includes('refresh_token=')) {
        // 💡 L'existence du cookie est suffisante pour un intercepteur SSR
        // Pour l'instant, on se contente de savoir qu'il existe.
        console.log('SSR: Refresh Token cookie trouvé. L\'intercepteur doit maintenant le gérer.');
      }
    }
    // Côté navigateur (Hydratation), la session est vide après un refresh complet,
    // mais elle sera rétablie par l'intercepteur lors du premier appel API
    // ou par un Resolver au chargement de la route.
  }

  // ----------------------------------------------------------------------
  // 1. Connexion / Déconnexion
  // ----------------------------------------------------------------------

  login(credentials: Credentials): Observable<AuthResponse> {
    // Étape 1.1: Validation des Credentials (ici, l'appel HTTP)
    // Le Backend gère les étapes 1.2 (génération) et 1.3 (stockage du Refresh Token en cookie)
    console.log("Tentative de connexion", credentials);
    return this.http.post<AuthResponse>(`${API_AUTH_URL}/login`, credentials)
      .pipe(
        // 1. Mise à jour de l'état (Doit se faire en premier pour mettre à jour le rôle)
        tap(response => this.setAuthState(response)),

        // 2. 🎯 NOUVEAU TAP : Exécuter la redirection après la mise à jour de l'état
        tap(() => this.redirectToAppropriateShell()),

        // 3. Gestion des erreurs (Doit être la dernière opération)
        catchError(this.handleError)
      );
  }

  //Logique de redirection centralisée.utilise le Router injecté pour naviguer en fonction du rôle mis à jour.
  private redirectToAppropriateShell(): void {
    const role = this.getUserRole(); // Lit le rôle fraîchement mis à jour

    switch (role) {
      case 'ETUDIANT':
        this.router.navigate(['/student/dashboard']);
        break;
      case 'TUTEUR':
        this.router.navigate(['/tutor/dashboard']);
        break;
      case 'ADMIN':
        console.log("Redirection vers le shell Administrateur.");
        this.router.navigate(['/admin/dashboard']); 
        break;
      default:
      // Fallback sécurisé : redirige vers une page d'accueil ou de déconnexion
      console.warn("Rôle utilisateur non reconnu ou manquant. Redirection par défaut.");
      this.router.navigate(['/']); 
      break;
    }
  }


  logout(): void {
    // Appel le Backend pour révoquer le Refresh Token côté serveur
    this.http.post(`${API_AUTH_URL}/logout`, {}).subscribe({
      next: () => this.clearAuthState(),
      error: () => this.clearAuthState() // Claire l'état même si l'appel échoue (déconnexion locale)
    });
  }

  // ----------------------------------------------------------------------
  // 2. Inscription
  // ----------------------------------------------------------------------
  register(registerData: RegisterData): Observable<any> { 
    return this.http.post<any>(`${API_AUTH_URL}/register`, registerData) // 💡 Endpoint: /register
      .pipe(
        // L'inscription réussie ne renvoie souvent pas de token mais juste un statut 200/201
        tap(() => console.log('Inscription réussie.')),
        catchError(this.handleError)
      );
  }






  // ----------------------------------------------------------------------
  // 3. Gestion des Tokens
  // ----------------------------------------------------------------------

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  // Lance la procédure de rafraîchissement
  refreshAccessToken(): Observable<AuthResponse> {
    // Étape 2.1: Appel à l'endpoint de refresh. 
    // Le Refresh Token HttpOnly est ENVOYÉ AUTOMATIQUEMENT par le navigateur.
    return this.http.post<AuthResponse>(`${API_AUTH_URL}/refresh`, {})
      .pipe(
        // Le Backend gère les étapes 2.2 à 2.6 (rotation, vérifications, révocation)
        tap(response => this.setAuthState(response)),
        catchError(this.handleError)
      );
  }

  // ----------------------------------------------------------------------
  // 4. Gestion de l'état local (Mémoire / SessionStorage)
  // ----------------------------------------------------------------------

  private setAuthState(response: AuthResponse): void {
    this.clearAuthState(); // Nettoie tout état précédent

    this.accessToken = response.accessToken;
    this.currentUserSubject.next(response.user);
    
    // Détecter et afficher l'alerte de sécurité si présente
    if (response.securityAlert) {
        this.securityAlertSubject.next(response.securityAlert);
        if (response.securityAlert.actionRequired) {
             // Si action requise (CRITICAL), forcer la déconnexion locale après alerte
             this.clearAuthState(); 
        }
    }

    // Mise en place du timer d'expiration de l'Access Token
    // CRITIQUE SSR : Le timer doit être activé UNIQUEMENT côté navigateur
    if(this.isBrowser){
      const expiryTimeMs = response.expiresIn * 1000;
      this.tokenExpirationTimer = timer(expiryTimeMs).subscribe(() => {
        // Le timer a expiré. Ne fait rien si le Refresh Token n'a pas été utilisé
        // L'intercepteur HTTP se chargera d'appeler refreshAccessToken() à la prochaine requête API
      });
    }
  }

  private clearAuthState(): void {
    //CRITIQUE SSR : Nettoyage du timer uniquement côté navigateur
    if (this.isBrowser && this.tokenExpirationTimer) {
      this.tokenExpirationTimer.unsubscribe();
      this.tokenExpirationTimer = null;
    }
    this.accessToken = null;
    this.currentUserSubject.next(null);
    this.securityAlertSubject.next(null);
    // Supprimer l'état du sessionStorage si utilisé (ici, on privilégie le stockage en mémoire)
  }

  private loadAuthState(): void {
    // Si l'Access Token est stocké en sessionStorage (moins sécurisé que mémoire, mais persiste après refresh page)
    // Sinon, l'utilisateur devra se reconnecter après un refresh complet de la page
  }


  // ----------------------------------------------------------------------
  // 5. Gestion des erreurs
  // ----------------------------------------------------------------------

  private handleError = (error: HttpErrorResponse): Observable<never> => {

    let errorMessage = 'Une erreur inconnue est survenue.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      // Détection de réutilisation suspecte (401 avec message spécifique)
      if (error.status === 401) {
        if (error.error.message === 'Token compromis détecté') {
            alert('🚨 ALERTE SÉCURITÉ MAXIMALE ! Votre compte est compromis. Veuillez vous reconnecter.');
            // Gérer la redirection et la révocation locale
            this.clearAuthState(); // Nettoyage immédiat
            this.router.navigate(['/login']); // ⬅️ Ajout de la redirection (nécessite d'injecter Router)
         }
      }
      errorMessage = `Erreur Backend - Code ${error.status} : ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }




  /*************************************TEST********************************************************************* */
  /** Simule une connexion réussie avec un rôle spécifique */
  mockLogin(rolesList: roleList[] = ['ETUDIANT']): Observable<AuthResponse> {
    const mockUser: UserProfile = {
      id: 1,
      firstName: 'Marco',
      email: 'dev@educonnect.com',
      roles: rolesList, 
    };
    
    const mockResponse: AuthResponse = {
      accessToken: 'mock-jwt-token',
      tokenType: 'Bearer',
      expiresIn: 3600, // 1 heure
      user: mockUser,
      securityAlert: null,
    };

    // Simule l'appel API avec un délai
    return of(mockResponse).pipe(
      delay(500), 
      tap(response => this.setAuthState(mockResponse)) // Mette à jour l'état comme d'habitude
    );
  }

  // **********************************************************
  // 🧪 MÉTHODE FACTICE POUR LES TESTS
  // Simule une réponse de succès (le backend renvoie souvent un statut 201 ou un objet vide)
  mockRegisterSuccess(): Observable<any> {
    // Retourne un Observable qui se complète immédiatement avec une valeur nulle ou un objet vide.
    return of(null); 
  }
}

