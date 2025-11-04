import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./features/auth/login/login.component";
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tutorAppFrontend';

  private router = inject(Router);
  public isMinimalLayout: boolean = false;
  
  // Routes qui nécessitent le masquage du Header et Footer
  private minimalRoutes = [
    '/session/',
    '/student/',
    '/tutor/',
    '/admin'
  ];

  ngOnInit() {
    // Écouter les changements de route pour mettre à jour l'état du layout
    this.router.events
      .pipe(
        // On ne s'intéresse qu'aux événements de fin de navigation
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // Vérifie si l'URL actuelle commence par l'une des routes minimalistes
        this.isMinimalLayout = this.minimalRoutes.some(route => 
          event.urlAfterRedirects.startsWith(route)
        );
      });
  }
}
