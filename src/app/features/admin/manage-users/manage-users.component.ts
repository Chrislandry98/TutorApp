import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface User {
  id: number;
  name: string;
  role: 'Tutor' | 'Student' | 'Admin';
  email: string;
  status: 'Active' | 'Suspended' | 'Pending';
  lastActivity: string;
  warningCount: number;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  // Données de tous les utilisateurs
  public allUsers: User[] = [
    { id: 101, name: 'Sarah Johnson', role: 'Tutor', email: 'sarah@tutors.com', status: 'Active', lastActivity: '2 days ago', warningCount: 0 },
    { id: 102, name: 'Michael Brown', role: 'Tutor', email: 'michael@tutors.com', status: 'Pending', lastActivity: '5 days ago', warningCount: 1 },
    { id: 201, name: 'Alice Smith', role: 'Student', email: 'alice@students.com', status: 'Active', lastActivity: '1 hour ago', warningCount: 0 },
    { id: 202, name: 'Bob Wilson', role: 'Student', email: 'bob@students.com', status: 'Suspended', lastActivity: '3 months ago', warningCount: 3 },
    { id: 301, name: 'Admin Jane', role: 'Admin', email: 'jane@admin.com', status: 'Active', lastActivity: 'Now', warningCount: 0 },
  ];

  public displayedUsers: User[] = [];
  
  // Modèle pour les filtres
  public filters = {
    search: '',
    role: '',
    status: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.applyFilters(); // Chargement initial
  }

  // --- Logique de Filtrage ---

  public applyFilters(): void {
    let tempUsers = this.allUsers;

    // Filtrage par recherche (Nom ou Email)
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      tempUsers = tempUsers.filter(u => 
        u.name.toLowerCase().includes(searchTerm) || 
        u.email.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filtrage par Rôle
    if (this.filters.role) {
      tempUsers = tempUsers.filter(u => u.role === this.filters.role);
    }
    
    // Filtrage par Statut
    if (this.filters.status) {
      tempUsers = tempUsers.filter(u => u.status === this.filters.status);
    }

    this.displayedUsers = tempUsers;
  }

  public resetFilters(): void {
    this.filters = {
      search: '',
      role: '',
      status: ''
    };
    this.applyFilters();
  }

  // --- Actions Utilisateurs ---

  public editUser(userId: number): void {
    console.log(`Editing user ID: ${userId}. (Navigate to Edit Profile page)`);
    // Logique réelle: navigation vers une page de modification de profil (similaire à Edit Profile mais côté Admin).
    alert(`Opening edit form for User ID ${userId}`);
  }

  public toggleStatus(user: User): void {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    user.status = newStatus;
    console.log(`User ${user.id} status changed to ${newStatus}`);
    // Logique API pour mettre à jour le statut
    alert(`User ${user.name} status toggled to ${newStatus}.`);
  }

  // --- Fonctions d'Affichage ---

  public getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-success';
      case 'Pending': return 'bg-warning text-dark';
      case 'Suspended': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  public getRoleClass(role: string): string {
    switch (role) {
      case 'Tutor': return 'text-primary';
      case 'Student': return 'text-info';
      case 'Admin': return 'text-danger';
      default: return 'text-muted';
    }
  }

}
