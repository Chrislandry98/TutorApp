import { NgIf, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { AuthService } from '../../../core/services/authservice/auth.service';
import { RegisterData } from '../../../models/authmodels/registerData-model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  //Définir le role d'utilisateur actif ('student' par défaut)
  userRole: 'student' | 'tutor' = 'student';

  // Formulaires distincts pour chaque type d'utilisateur
  studentForm!: FormGroup;
  tutorForm!: FormGroup;

  // Liste des sujets (pour le champ de sélection)
  subjects: string[] = ['Mathématiques', 'Physique', 'Informatique', 'Anglais', 'Histoire'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // Initialisation du formulaire Étudiant (champs de base)
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator }); // Ajout du validateur personnalisé

    // Initialisation du formulaire Tuteur (champs de base + champs spécifiques)
    this.tutorForm = this.fb.group({
      // Champs communs
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      
      // Champs spécifiques au Tuteur
      bio: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(10)]],
      subjects: ['', Validators.required] // Le champ de sélection multiple
    }, { validator: this.passwordMatchValidator });
  }
  // Fonction pour changer le formulaire actif
  setUserRole(role: 'student' | 'tutor'): void {
    this.userRole = role;
  }

  // Fonction de validation personnalisée pour la correspondance des mots de passe
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')!.value === g.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  // Fonction de soumission principale
  onSubmit(): void {
    // 1. Déterminer le formulaire actif
   const activeForm = this.userRole === 'student' ? this.studentForm : this.tutorForm;
 
    if (activeForm.valid) {
      // Valeurs du formulaire
      const formValue = activeForm.value;

      // 2. Définir le rôle à envoyer au Backend (en majuscules, comme dans Spring Boot)
      const apiRole = this.userRole === 'student' ? 'ETUDIANT' : 'TUTEUR';

      // 3. Construction de l'objet de données final (RegisterData)
      const registerData: RegisterData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        // Le phoneNumber est optionnel mais inclus s'il est présent
        phoneNumber: formValue.phoneNumber, 
        password: formValue.password,
        role: apiRole, // Rôle critique pour le Backend
  
        // Ajout conditionnel des champs spécifiques au tuteur
        ...(this.userRole === 'tutor' && {
          bio: formValue.bio,
          hourlyRate: formValue.hourlyRate,
          // Assurez-vous que subjects est envoyé comme une liste de strings
          // Si le select est simple, formValue.subjects est une string. S'il est multiple, c'est un Array.
          subjects: Array.isArray(formValue.subjects) ? formValue.subjects : [formValue.subjects] 
        })
      };
      
      // 4. Appel au service d'authentification
      this.authService.register(registerData).subscribe({
        next: () => {
          // Succès : l'utilisateur est enregistré. Redirection vers la page de connexion.
          console.log('Inscription réussie. Redirection vers la connexion.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          // L'erreur est normalement gérée dans handleError du AuthService (affichage dans la console)
          console.error("Échec de l'inscription.", err);
          // 💡 Vous pouvez ajouter ici un service de notification (Toast) pour l'utilisateur
        }
      });

    } else {
      // 5. Formulaire invalide
      console.log('Formulaire invalide.');
      // Marquer tous les champs comme 'touchés' pour déclencher l'affichage des erreurs Bootstrap
      activeForm.markAllAsTouched();
    }

  }
  // **********************************************************
  // 🚀 TEST RAPIDE : Méthode pour simuler un clic d'enregistrement réussi
  // Ceci n'est PAS la méthode onSubmit()
  testRegisterSuccess(): void {
    // Appelle la méthode factice du service
    this.authService.mockRegisterSuccess().subscribe({
      next: () => {
        console.log("TEST MOCK : Inscription réussie simulée. Redirection vers /login...");
        // Si le mock réussit, on navigue vers la page de connexion
        this.router.navigate(['/login']); 
      },
      error: (err: any) => {
        console.error("TEST MOCK : Erreur lors de la simulation. La méthode doit toujours réussir.", err);
      }
    }); 
  }

}
