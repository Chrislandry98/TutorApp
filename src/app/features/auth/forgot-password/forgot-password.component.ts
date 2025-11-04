import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  // Propriété pour le formulaire
  forgotPasswordForm!: FormGroup;
  
  // Indicateur de chargement lors de la soumission
  isLoading: boolean = false;
  
  // Message de succès ou d'erreur à afficher à l'utilisateur
  message: string | null = null;
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialisation du formulaire avec un validateur d'email requis
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Accesseur facile pour les contrôles du formulaire dans le template
  get emailControl() {
    return this.forgotPasswordForm.get('email');
  }

  /**
   * Gère la soumission du formulaire pour l'envoi du lien de réinitialisation.
   */
  onSubmit(): void {
    this.message = null; // Réinitialiser les messages

    if (this.forgotPasswordForm.invalid) {
      // Marquer tous les champs comme 'touchés' pour afficher les erreurs de validation
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    // --- LOGIQUE D'APPEL AU BACKEND (Simulée) ---
    // Normalement, vous appelleriez ici un service (ex: AuthService)
    // this.authService.sendResetLink(email).subscribe(...)
    
    // Simulation d'une requête asynchrone réussie
    setTimeout(() => {
      this.isLoading = false;
      this.isSuccess = true;
      // Message de succès comme on le voit souvent pour des raisons de sécurité (même si l'email n'existe pas)
      this.message = `Un lien de réinitialisation a été envoyé à ${email}, si le compte existe. Vérifiez votre boîte de réception.`;
      
      // Optionnel: Réinitialiser le formulaire après succès
      this.forgotPasswordForm.reset();
      
    }, 2000); 
    // --- FIN LOGIQUE D'APPEL AU BACKEND ---
  }

  /**
   * Navigue vers la page de connexion.
   */
  goToLogin(): void {
    // Assurez-vous que votre route de connexion est bien '/login'
    this.router.navigate(['/login']); 
  }
}
