import { Component, inject, OnInit } from '@angular/core';
import { StudentSession } from '../../../models/studentmodels/student-session';
import { StudentTransaction } from '../../../models/studentmodels/student-transaction';
import { LearningStats } from '../../../models/studentmodels/learning-stats';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { StudentAcoountService } from '../../../core/services/studentservice/student-acoount.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {

  private router = inject(Router);
  private studentAccountService = inject(StudentAcoountService)
  
  studentName: string = 'TEKEM TAMO';
  accountBalance: number = this.studentAccountService.getBalance();
  scheduledSessionsCount: number = 1;
  completedSessionsCount: number = 1;

  upcomingSessions: StudentSession[] = [];
  recentTransactions: StudentTransaction[] = [];
  learningStats: LearningStats = {
    totalHours: 2.5,
    favoriteSubject: 'Mathematics',
    activeTutors: 2
  };

  constructor() { }

  ngOnInit(): void {
    // Simulation du chargement des données
    this.upcomingSessions = this.loadUpcomingSessions();
    this.recentTransactions = this.loadRecentTransactions();
  }

  private loadUpcomingSessions(): StudentSession[] {
    return [
      {
        tutorName: 'Sarah Johnson',
        subject: 'Calculus',
        duration: 60,
        date: '14/03/2024',
        status: 'confirmed',
        tutorPhotoUrl: 'assets/images/sarah_johnson.jpg' // Image du tuteur
      }
    ];
  }

  private loadRecentTransactions(): StudentTransaction[] {
    return this.studentAccountService.getAllTransactions();
  }

  // Les autres méthodes (Find Tutor, Recharge, etc.) seraient implémentées ici
  findTutor(): void { /* Logic de navigation */ this.router.navigate(['/student/search'])}
  getSessions(): void { /* Logic de navigation */ this.router.navigate(['/student/session'])}
  rechargeBalance(): void { /* Logic de paiement */  this.router.navigate(['/student/recharge']) }
  editProfile(): void { /* Logic de paiement */  this.router.navigate(['/student/profile']) }
}
