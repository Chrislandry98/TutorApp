import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
 private isBrowser: boolean; // Ajout d'une propriété pour stocker l'état du navigateur

  // Injection de PLATFORM_ID
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    // Détermination de la plateforme d'exécution
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Retourne l'utilisateur à la page d'accueil ou de connexion.
  */
  goToHome(): void {
    // Redirection standard via le routeur, sécurisée pour SSR
    this.router.navigate(['/']); 
  }

  /**
   * Tente de retourner à la page précédente dans l'historique du navigateur, 
   * uniquement si le code s'exécute côté client (navigateur).
   */
  goBack(): void {
    // Vérification de la plateforme pour éviter les erreurs en SSR
    if (this.isBrowser) {
      window.history.back();
    } else {
      // Alternative pour SSR ou si l'historique est vide : redirection vers l'accueil
      this.router.navigate(['/']);
    }
  }
}
