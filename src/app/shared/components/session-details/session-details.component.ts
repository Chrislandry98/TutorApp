import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionDetail } from '../../../models/sessionmodels/session-detail';


@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.css'
})
// 🔑 Implémentation correcte des interfaces de cycle de vie
export class SessionDetailsComponent implements OnInit, OnChanges, OnDestroy {
  // Utilisez un getter/setter ou une propriété privée pour intercepter l'Input
 @Input({ required: true }) session!: SessionDetail; 
 @Input({ required: true }) userRole!: 'student' | 'tutor';


  public timeUntilStart: string = '';
  public isLaunchEnabled: boolean = false;
  private timer: any;
  public showFeedbackForm: boolean = false;
  
  public sessionRating: number = 0;
  public sessionReport: string = '';

  ngOnInit(): void {
    // Laisser vide
  }

  // 🔑 Logique critique : Gère le changement de l'Input session
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['session'] && changes['session'].currentValue) {
      
      if (this.timer) {
        clearInterval(this.timer);
      }
      
      this.updateTimeStatus(); 

      if (this.session.status === 'Upcoming') {
        this.timer = setInterval(() => this.updateTimeStatus(), 1000);
      }

      // Initialiser le formulaire si complété et feedback manquant
      if (this.session.status === 'Completed') {
         this.showFeedbackForm = (this.userRole === 'student' && !this.session.rating) ||
                                 (this.userRole === 'tutor' && !this.session.report);
      } else {
        this.showFeedbackForm = false; 
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // 🔑 Méthode pour contourner l'erreur 'Object is possibly undefined' dans le *ngIf
  public hasFiles(): boolean {
      return !!this.session && !!this.session.files && this.session.files.length > 0;
  }
  
  private updateTimeStatus(): void {
    // Sécurité de lecture (garantie par ngOnChanges)
    if (!this.session || !this.session.dateTime) {
      return; 
    }

    const now = new Date();
    const LAUNCH_MINUTES_BEFORE = 15;
    const launchTime = new Date(this.session.dateTime.getTime() - (LAUNCH_MINUTES_BEFORE * 60 * 1000)); 
    const startTime = this.session.dateTime;
    
    if (this.session.status === 'Upcoming') {
      
      if (now >= launchTime && now < startTime) {
        this.isLaunchEnabled = true;
        const msToStart = startTime.getTime() - now.getTime();
        const minutes = Math.floor(msToStart / (1000 * 60));
        const seconds = Math.floor((msToStart % (1000 * 60)) / 1000);
        this.timeUntilStart = `Débute dans ${minutes}m ${seconds}s.`;
        
      } else if (now < launchTime) {
        this.isLaunchEnabled = false;
        const msToLaunch = launchTime.getTime() - now.getTime();
        const hours = Math.floor(msToLaunch / (1000 * 60 * 60));
        const minutes = Math.floor((msToLaunch % (1000 * 60 * 60)) / (1000 * 60));
        this.timeUntilStart = `Disponible dans ${hours}h ${minutes}m.`;
        
      } else if (now >= startTime) {
        this.isLaunchEnabled = false;
        this.timeUntilStart = 'Session terminée.';
        this.showFeedbackForm = (this.userRole === 'tutor' && !this.session.report) || 
                                (this.userRole === 'student' && !this.session.rating);
        clearInterval(this.timer);
      }
    } else {
      this.timeUntilStart = 'N/A';
      this.isLaunchEnabled = false;
      clearInterval(this.timer); 
    }
  }
  
  public launchMeeting(): void {
    if (this.isLaunchEnabled && this.session.zoomLink) {
      window.open(this.session.zoomLink, '_blank');
    } else {
      alert("Le lancement n'est pas encore actif. Veuillez attendre les 15 minutes avant le début.");
    }
  }

  public submitFeedback(): void {
    if (this.userRole === 'tutor') {
      if (!this.sessionReport) {
        alert("Veuillez remplir le rapport de session.");
        return;
      }
      this.session.report = this.sessionReport;
    } else if (this.userRole === 'student') {
      if (this.sessionRating === 0) {
        alert("Veuillez donner une note.");
        return;
      }
      this.session.rating = this.sessionRating;
    }
    
    this.showFeedbackForm = false;
    alert("Feedback soumis. Merci !");
  }
}