import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/authservice/auth.service';

//Vérifie que l'ID dans la route (:id) correspondà l'ID de l'utilisateur connecté (pour les profils personnels).
export const userGuard: CanActivateFn = (route, state): boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Récupérer l'ID de l'utilisateur connecté (synchrone)
  const currentUserId = authService.getCurrentUserId(); 

  // 2. Récupérer l'ID de la route (le profil demandé)
  const targetUserId = +route.params['id']; 

  // Vérification de base (l'AuthGuard s'occupe de l'authentification)
  if (!currentUserId || isNaN(targetUserId)) {
    // Cas où le service d'auth n'a pas pu récupérer l'ID (très improbable après l'AuthGuard)
    return router.createUrlTree(['/unauthorized']);
  }

  // 3. LOGIQUE D'AUTORISATION : Comparaison
  if (currentUserId === targetUserId) {
    return true; // Accès autorisé : C'est le bon utilisateur
  } else {
    // Tentative d'accès à un autre profil : Refusé (IDOR Prevention)
    console.error(`Accès refusé. Tentative d'IDOR : ${currentUserId} essaie d'accéder à ${targetUserId}.`);
    return router.createUrlTree(['/unauthorized']); 
  }
  
};
