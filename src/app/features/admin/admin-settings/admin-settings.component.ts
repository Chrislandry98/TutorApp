import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  twoFactorEnabled: boolean;
}

export interface PasswordChange {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit{
  public profile: AdminProfile = {
    name: 'Admin Jane Doe',
    email: 'jane.doe@platform.com',
    phone: '+1 (555) 987-6543',
    twoFactorEnabled: true
  };

  public passwordForm: PasswordChange = {};
  public isProfileEditing: boolean = false;
  
  // Modèle pour le toggle de la 2FA (simule le statut actuel)
  public twoFactorStatus: boolean = this.profile.twoFactorEnabled;

  constructor() { }

  ngOnInit(): void { }

  // --- ACTIONS PROFIL ---

  public toggleProfileEdit(): void {
    this.isProfileEditing = !this.isProfileEditing;
  }

  public saveProfile(): void {
    console.log('Profile saved:', this.profile);
    this.isProfileEditing = false;
    alert('Profile information updated successfully!');
  }

  // --- ACTIONS SÉCURITÉ ---

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
    alert('Password change initiated. Check your email for confirmation.');
    this.passwordForm = {}; // Réinitialiser le formulaire
  }

  public toggleTwoFactor(): void {
    // Dans une application réelle, ceci ouvrirait une modale pour scanner le QR code.
    if (this.twoFactorStatus) {
      alert('Two-Factor Authentication is now enabled. Please check your authenticator app for the new code.');
      this.profile.twoFactorEnabled = true;
    } else {
      alert('Two-Factor Authentication is disabled. Please confirm via email.');
      this.profile.twoFactorEnabled = false;
    }
  }
}
