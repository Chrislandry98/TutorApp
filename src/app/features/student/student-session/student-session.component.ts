import { Component, inject, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/sessionservice/session.service';
import { Session } from '../../../models/sessionmodels/session';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-session',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './student-session.component.html',
  styleUrl: './student-session.component.css'
})
export class StudentSessionComponent implements OnInit{

  //Injecter le service pour recuperer les sessions
  private sessionService = inject(SessionService); 

  //Initialiser les variables
  allSessions: Session[] = [];
  filteredSessions: Session[] = [];
  activeFilter: 'All Sessions' | 'Upcoming' | 'Completed' | 'Cancelled' = 'All Sessions';

  constructor() { }

  ngOnInit(): void {
    this.allSessions = this.loadAllSessions();
    this.filterSessions(this.activeFilter);
  }  

  loadAllSessions() : Session[]{
    return this.sessionService.getSessionTest();
  }

  filterSessions(filter: typeof this.activeFilter): void {
    this.activeFilter = filter;
    
    if (filter === 'All Sessions') {
      this.filteredSessions = this.allSessions;
    } else {
      // Pour 'confirmed' et 'upcoming', nous pouvons les considérer comme des sessions à venir (Upcoming)
      const statusToFilter = filter === 'Upcoming' ? ['confirmed', 'upcoming'] : [filter.toLowerCase()];
      
      this.filteredSessions = this.allSessions.filter(session => 
        statusToFilter.includes(session.status)
      );
    }
  }

  // Fonctions de logique
  reschedule(sessionId: number): void { console.log('Reschedule session:', sessionId); }
  cancel(sessionId: number): void { console.log('Cancel session:', sessionId); }
  viewTutor(sessionId: number): void { console.log('View tutor for session:', sessionId); }
  leaveReview(sessionId: number): void { console.log('Leave review for session:', sessionId); }

  getPaymentColor(status: 'paid' | 'pending'): string {
    return status === 'paid' ? 'text-success' : 'text-danger';
  }

}
