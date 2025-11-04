import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface SubjectExpertise {
  subjectName: string;
  levelName: string;
  hourlyRate: number; // Taux horaire spécifique pour cette combinaison
}

export interface TutorProfile {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  profilePictureUrl: string;
  // ... autres infos personnelles

  // Informations spécifiques au tutoring
  expertise: SubjectExpertise[];
  baseRate: number; // Taux horaire par défaut
}

export interface PasswordChange {
  /** * Le mot de passe actuel de l'utilisateur, requis pour des raisons de sécurité 
   * et pour vérifier les privilèges de modification. 
   */
  currentPassword?: string;
  
  /** * Le nouveau mot de passe que l'utilisateur souhaite définir.
   */
  newPassword?: string;
  
  /** * Confirmation du nouveau mot de passe, utilisée côté front-end pour s'assurer 
   * qu'il n'y a pas d'erreur de frappe avant l'envoi à l'API.
   */
  confirmPassword?: string;
}

@Component({
  selector: 'app-tutor-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutor-settings.component.html',
  styleUrl: './tutor-settings.component.css'
})
export class TutorSettingsComponent implements OnInit{

  private router = inject(Router)

 // Données de profil simulées
  public tutorProfile: TutorProfile = {
    fullName: 'Alice Johnson',
    email: 'alice.j@tutor.com',
    phone: '+1 (555) 111-2222',
    bio: 'Experienced math and science tutor with 5 years of experience helping high school students achieve top grades.',
    profilePictureUrl: 'images-Homepage/tuteurs/tuteur3.png',
    baseRate: 40,
    expertise: [
      { subjectName: 'Mathematics', levelName: 'High School', hourlyRate: 45 },
      { subjectName: 'Physics', levelName: 'College', hourlyRate: 50 }
    ]
  };

  // Liste pour les formulaires
  public availableSubjects: string[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History'];
  public availableLevels: string[] = ['Primary School', 'High School', 'College', 'University Level'];
  
  // Modèle pour l'ajout d'une nouvelle expertise
  public newExpertise: SubjectExpertise = { subjectName: '', levelName: '', hourlyRate: 0 };
  
  // Modèle pour le formulaire de mot de passe
  public passwordForm: PasswordChange = {}; // AJOUTÉ
  
  // Modèles d'état d'édition
  public editingBio: string = this.tutorProfile.bio;
  public isBioEditing: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.editingBio = this.tutorProfile.bio;
  }

  // --- LOGIQUE GÉNÉRALE ET PROFIL ---

  public saveChanges(section: string): void {
    console.log(`Saving changes for section: ${section}`);
    alert(`${section} updated successfully!`);
  }
  
  public saveBio(): void {
      this.tutorProfile.bio = this.editingBio;
      this.isBioEditing = false;
      this.saveChanges('Biography');
  }

  public toggleBioEdit(): void {
    this.isBioEditing = !this.isBioEditing;
    if (this.isBioEditing) {
      this.editingBio = this.tutorProfile.bio;
    }
  }

  // --- LOGIQUE DE SÉCURITÉ (Mot de Passe) ---

  public changePassword(): void {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    if (!this.passwordForm.currentPassword || !this.passwordForm.newPassword) {
        alert('Please fill in all password fields.');
        return;
    }

    // Ici, appeler le service API pour changer le mot de passe
    console.log('Attempting password change...');
    alert('Password updated successfully!');
    this.passwordForm = {}; // Réinitialiser le formulaire
  }

  // --- LOGIQUE EXPERTISE/TARIFS ---

  public addExpertise(): void {
    if (this.newExpertise.subjectName && this.newExpertise.levelName && this.newExpertise.hourlyRate > 0) {
      this.tutorProfile.expertise.push({ ...this.newExpertise });
      this.newExpertise = { subjectName: '', levelName: '', hourlyRate: 0 };
      this.saveChanges('Expertise');
    } else {
      alert('Please fill out all fields for the new expertise.');
    }
  }

  public removeExpertise(index: number): void {
    if (confirm('Are you sure you want to remove this expertise?')) {
      this.tutorProfile.expertise.splice(index, 1);
      this.saveChanges('Expertise');
    }
  }
  
  public updateProfilePicture(): void {
    alert('Simulating file upload for profile picture...');
  }

  public formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}/hr`;
  }

  // Simule le retour au tableau de bord
  public backToDashboard(): void {
    console.log('Naviguer vers /dashboard');
    this.router.navigate(['tutor/dashboard']);
  }
}
