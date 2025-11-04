import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { Credentials } from '../../../models/authmodels/credentials-model';
import { AuthService } from '../../../core/services/authservice/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authservice = inject(AuthService)
  private router = inject(Router)


  loginForm: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null>; }>;

  // Initialisation du FormGroup
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  //Implémentation de la méthode onSubmit pour valider les champs du formulaire avant validation
  onSubmit() {
    if (this.loginForm.valid) {
      
      // Extraction des données du formulaire
      const credentials = this.loginForm.value as Credentials;
      console.log('Données de connexion:', this.loginForm.value);
      
      // 4. Envoi au service d'authentification
      this.authservice.login(credentials).subscribe({
          next: (response) => {
              // Gérer la connexion réussie et la redirection
              console.log("Connexion réussie!", response);
          },
          error: (err) => {
              // Afficher l'erreur à l'utilisateur
              console.error("Erreur de connexion:", err);
          }
      }); 

    } else {
      console.log('Formulaire invalide.');
      this.loginForm.markAllAsTouched();
    }
  }


  /************************test*************************** */
     // Dans votre LoginComponent ou un composant de test
      testLogin() {
        // Remplacez l'appel réel par la méthode factice
        this.authservice.mockLogin(['ETUDIANT']).subscribe(() => {
          // Naviguez vers la page principale
          this.router.navigate(['/student']);
      }); 
    }
}

