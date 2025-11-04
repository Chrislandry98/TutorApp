import { Component, inject, OnInit } from '@angular/core';
import { StatCardComponent } from "./stat-card/stat-card.component";
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

// Interface pour les cartes de statistiques en haut
export interface StatsCardData {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string; // Icône Bootstrap (ex: bi-currency-dollar)
  color: string; // Classe de couleur Bootstrap pour l'icône (ex: text-success)
}

// Interface pour les sessions à venir
export interface UpcomingSession {
  title: string;
  subject: string;
  duration: number; // en minutes
  price: number;
  date: string; // Format 'DD/MM/YYYY' ou Date
}

// Interface pour les métriques de performance
export interface PerformanceMetric {
  label: string;
  percentage: number;
  barColor: string; // Classe de couleur Bootstrap pour la barre (ex: primary, success, info)
}

// Interface pour le statut du compte et les statistiques du mois
export interface AccountStatus {
  validation: 'verified' | 'pending';
  hourlyRate: number;
  subjectsCount: number;
}

export interface MonthlyStats {
  sessions: number;
  hoursTaught: number;
  earnings: number;
}


@Component({
  selector: 'app-tutor-dashboard',
  standalone: true,
  imports: [StatCardComponent, NgFor, NgIf],
  templateUrl: './tutor-dashboard.component.html',
  styleUrl: './tutor-dashboard.component.css'
})
export class TutorDashboardComponent implements OnInit {
  // Les données sont initialisées ici, mais dans une application réelle,
  // elles seraient chargées via un service HTTP (this.tutorService.getDashboardData().subscribe(...)).

  private router = inject(Router)


  public isVerified: boolean = true;

  public statsData: StatsCardData[] = [
    {
      title: 'Total Earnings',
      value: '$0.00',
      subtitle: '+$0.00 this month',
      icon: 'bi-currency-dollar',
      color: 'text-success'
    },
    {
      title: 'Total Sessions',
      value: 127,
      subtitle: 'Lifetime sessions',
      icon: 'bi-person-video',
      color: 'text-primary'
    },
    {
      title: 'Upcoming Sessions',
      value: 1,
      subtitle: 'Scheduled',
      icon: 'bi-calendar-check',
      color: 'text-info'
    },
    {
      title: 'Rating',
      value: 4.8,
      subtitle: 'Average rating',
      icon: 'bi-star-fill',
      color: 'text-warning'
    },
  ];

  public upcomingSessions: UpcomingSession[] = [
    {
      title: 'Student Session',
      subject: 'Calculus',
      duration: 60,
      price: 45.00,
      date: '14/03/2024'
    }
  ];

  public performanceMetrics: PerformanceMetric[] = [
    { label: 'Profile Completion', percentage: 85, barColor: 'primary' },
    { label: 'Response Rate', percentage: 92, barColor: 'success' },
    { label: 'Session Completion', percentage: 98, barColor: 'info' }
  ];

  public accountStatus: AccountStatus = {
    validation: 'verified',
    hourlyRate: 45,
    subjectsCount: 2
  };

  public monthlyStats: MonthlyStats = {
    sessions: 25,
    hoursTaught: 38,
    earnings: 0.00
  };

  constructor() { }

  ngOnInit(): void {
    // Ici, vous appelleriez votre service pour charger les données initiales
  }

  // Méthodes pour les Quick Actions (navigation ou modales)
  public manageSchedule(): void {
    console.log('Navigating to schedule management...');
    this.router.navigate(['tutor/schedule']);
  }

  public uploadDocuments(): void {
    console.log('Opening document upload modal...');
    this.router.navigate(['tutor/documents'])
  }

  public editProfile(): void {
    console.log('Navigating to profile editor...');
    this.router.navigate(['tutor/settings'])
  }

  // Fonction pour formater le prix (utilisée dans le HTML)
  public formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
  
}
