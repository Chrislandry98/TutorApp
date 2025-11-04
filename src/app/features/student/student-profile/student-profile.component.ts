import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  schoolLevel: string; // Ex: High School, College, etc.
  profilePictureUrl: string;
}

// Nous réutilisons celle-ci
export interface PasswordChange {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})

export class StudentProfileComponent implements OnInit {
  // Données de profil simulées
  public studentProfile: StudentProfile = {
    fullName: 'Bob Smith',
    email: 'bob.smith@student.com',
    phone: '+1 (555) 333-4444',
    schoolLevel: 'High School',
    profilePictureUrl: 'images-Homepage/tuteurs/tuteur1.png'
  };

  // Listes de sélection
  public availableLevels: string[] = ['Primary School', 'Middle School', 'High School', 'College', 'Adult Learner'];
  
  // Modèle pour le formulaire de mot de passe
  public passwordForm: PasswordChange = {}; 

  constructor() { }

  ngOnInit(): void { }

  // --- LOGIQUE GÉNÉRALE ET PROFIL ---

  public saveProfile(): void {
    console.log('Saving profile changes:', this.studentProfile);
    // Ici, vous appelez le service API pour sauvegarder les données
    alert('Profile information updated successfully!');
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

    // Appel API pour changer le mot de passe
    console.log('Attempting password change...');
    alert('Password updated successfully!');
    this.passwordForm = {}; // Réinitialiser le formulaire
  }
  
  public updateProfilePicture(): void {
    alert('Simulating file upload for profile picture...');
  }
}
