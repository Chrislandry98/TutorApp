import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Remplacez le contenu de votre fichier admin.models.ts (ou data.models.ts) par ceci:

export interface AdminStatsCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}

export interface TutorValidation {
  id: number;
  name: string;
  email: string;
  appliedDate: string;
  hasWarning: boolean;
}

export interface RecentTransaction {
  id: number;
  description: string;
  date: string;
  amount: string;
  type: 'recharge' | 'payment';
  status: 'completed';
}

export interface PlatformStats {
  totalTutors: number;
  totalSubjects: number;
  totalLevels: number;
  activeStudents: number;
  avgSessionRate: number;
  platformRating: number;
}

// --- NOUVEAUX MODÈLES DE GESTION ---

/*export interface User {
  id: number;
  name: string;
  role: 'Tutor' | 'Student' | 'Admin';
  email: string;
  status: 'Active' | 'Suspended' | 'Pending';
}

export interface Subject {
  id: number;
  name: string;
  associatedLevels: number; 
}

export interface Level {
  id: number;
  name: string;
  associatedSubjects: number;
} */

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // ... (Données existantes: statsData, pendingValidations, recentTransactions, platformStats)

  public statsData: AdminStatsCard[] = [
    { title: 'Total Revenue', value: '$45.00', subtitle: 'Platform earnings', icon: 'bi-currency-dollar', color: 'text-success' },
    { title: 'Total Sessions', value: 2, subtitle: 'All time', icon: 'bi-people', color: 'text-primary' },
    { title: 'Verified Tutors', value: 3, subtitle: 'Active tutors', icon: 'bi-check-circle', color: 'text-success' },
    { title: 'Pending Validation', value: 1, subtitle: 'Requires review', icon: 'bi-exclamation-triangle', color: 'text-warning' },
  ];

  public pendingValidations: TutorValidation[] = [
    { id: 1, name: 'Michael Brown', email: 'michael.cs@tutors.com', appliedDate: '04/01/2024', hasWarning: true }
  ];

  public recentTransactions: RecentTransaction[] = [
    { id: 201, description: 'Account Recharge', date: 'Feb 29, 2024', amount: '+$100.00', type: 'recharge', status: 'completed' },
    { id: 202, description: 'Session Payment', date: 'Mar 14, 2024', amount: '-$45.00', type: 'payment', status: 'completed' },
    { id: 203, description: 'Account Recharge', date: 'Mar 19, 2024', amount: '+$200.00', type: 'recharge', status: 'completed' },
  ];

  public platformStats: PlatformStats = {
    totalTutors: 4,
    totalSubjects: 15,
    totalLevels: 20,
    activeStudents: 1,
    avgSessionRate: 47.50,
    platformRating: 4.8
  };
  
  // --- NOUVELLES DONNÉES DE GESTION ---
  
 /* public allUsers: User[] = [
    { id: 101, name: 'Sarah Johnson', role: 'Tutor', email: 'sarah@tutors.com', status: 'Active' },
    { id: 102, name: 'Michael Brown', role: 'Tutor', email: 'michael@tutors.com', status: 'Pending' },
    { id: 201, name: 'Alice Smith', role: 'Student', email: 'alice@students.com', status: 'Active' },
    { id: 301, name: 'Admin Jane', role: 'Admin', email: 'jane@admin.com', status: 'Active' },
  ];
  
  public subjects: Subject[] = [
    { id: 1, name: 'Mathematics', associatedLevels: 4 },
    { id: 2, name: 'Physics', associatedLevels: 2 },
    { id: 3, name: 'French', associatedLevels: 3 },
  ];
  
  public levels: Level[] = [
    { id: 1, name: 'High School', associatedSubjects: 3 },
    { id: 2, name: 'College', associatedSubjects: 2 },
    { id: 3, name: 'University Level', associatedSubjects: 1 },
  ];
  */
  constructor() { }
  ngOnInit(): void { /* ... */ }
  
  private route = inject(Router)

  // --- FONCTIONS EXISTANTES ---

  public reviewTutor(tutorId: number): void { 
    console.log(`Reviewing tutor ID: ${tutorId}`);
    this.route.navigate(['/admin/tutors/'])
  }

  public reviewAllTutor(): void { 
    this.route.navigate(['/admin/tutors/']);
  }

  public auditTransactions(): void { 
    this.route.navigate(['/admin/transactions/']);
  }

  public manageUsers(): void { 
    this.route.navigate(['/admin/users/']);
  }

  public manageSubjects(): void { 
    this.route.navigate(['/admin/subjects/']);
  }

  public manageSettings(): void { 
    this.route.navigate(['/admin/settings/']);
  }



  public quickAction(action: string): void { console.log(`Executing quick action: ${action}`); }

  public formatCurrency(value: number | string): string {
    if (typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    if (value.startsWith('+') || value.startsWith('-')) {
        return value.replace(/([+-])\$?(\d+)/, '$1$$$2');
    }
    return `$${value}`;
  }

  // --- NOUVELLES FONCTIONS DE GESTION ---

 /* public manageUsers(): void {
    console.log('Navigating to full User Management page.');
  }

  public editUser(userId: number): void {
    console.log(`Editing user ID: ${userId}`);
  }

  public toggleUserStatus(userId: number): void {
    const user = this.allUsers.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'Active' ? 'Suspended' : 'Active';
      console.log(`Toggled status for user ID: ${userId} to ${user.status}`);
    }
  }

  public manageSubjectsLevels(): void {
    console.log('Navigating to full Subject/Level Management page.');
  }
  
  public editSubject(subjectId: number): void {
    console.log(`Editing subject ID: ${subjectId}`);
  }
  
  public deleteSubject(subjectId: number): void {
    // Cette implémentation serait plus complexe en réalité (vérification des liens, etc.)
    this.subjects = this.subjects.filter(s => s.id !== subjectId);
    console.log(`Deleting subject ID: ${subjectId}`);
  }

  public editLevel(levelId: number): void {
    console.log(`Editing level ID: ${levelId}`);
  }
  
  /*public deleteLevel(levelId: number): void {
    this.levels = this.levels.filter(l => l.id !== levelId);
    console.log(`Deleting level ID: ${levelId}`);
  }*/
}

