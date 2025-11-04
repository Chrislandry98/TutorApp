import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// tutor.models.ts
export interface Session {
  sessionId: string;
  studentName: string;
  topic: string;
  date: string;
  duration: number; // en minutes
  status: 'Completed' | 'Upcoming' | 'Cancelled';
  hourlyRate: number;
}

export interface StudentInfo {
  studentId: string;
  name: string;
  level: string;
  sessionsCount: number;
}

@Component({
  selector: 'app-tutor-students',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tutor-students.component.html',
  styleUrl: './tutor-students.component.css'
})

export class TutorStudentsComponent implements OnInit{

  public activeTab: 'sessions' | 'students' = 'sessions';
  
  // Données simulées (Mise à jour pour inclure un ID unique pour l'action)
  public sessions: Session[] = [
    { sessionId: 'S001', studentName: 'Alice Dubois', topic: 'Calcul différentiel', date: '2025-11-10 14:00', duration: 60, status: 'Upcoming', hourlyRate: 30 },
    { sessionId: 'S002', studentName: 'Bob Smith', topic: 'Introduction à Python', date: '2025-10-28 10:00', duration: 90, status: 'Completed', hourlyRate: 35 },
    { sessionId: 'S003', studentName: 'Charles Léger', topic: 'Révision de l\'algèbre', date: '2025-11-05 16:30', duration: 45, status: 'Upcoming', hourlyRate: 30 },
    { sessionId: 'S004', studentName: 'Alice Dubois', topic: 'Statistiques', date: '2025-10-20 18:00', duration: 60, status: 'Completed', hourlyRate: 30 },
    { sessionId: 'S005', studentName: 'Danielle F.', topic: 'Géométrie', date: '2025-11-02 11:00', duration: 60, status: 'Cancelled', hourlyRate: 30 },
  ];

  public students: StudentInfo[] = [
    // ... (Reste inchangé pour cet ajustement)
    { studentId: 'E01', name: 'Alice Dubois', level: 'Collège - Secondaire 5', sessionsCount: 2 },
    { studentId: 'E02', name: 'Bob Smith', level: 'Université - 1ère année', sessionsCount: 1 },
    { studentId: 'E03', name: 'Charles Léger', level: 'Lycée - 1ère', sessionsCount: 1 },
  ];

  public upcomingSessions: Session[] = [];
  public completedSessions: Session[] = [];
  public cancelledSessions: Session[] = []; // Nouvelle liste pour les annulations

  ngOnInit(): void {
    this.filterSessions();
  }

  public setActiveTab(tab: 'sessions' | 'students'): void {
    this.activeTab = tab;
  }
  
  // Nouvelle méthode de filtrage centralisée
  private filterSessions(): void {
    this.upcomingSessions = this.sessions.filter(s => s.status === 'Upcoming');
    this.completedSessions = this.sessions.filter(s => s.status === 'Completed');
    this.cancelledSessions = this.sessions.filter(s => s.status === 'Cancelled');
  }

  /**
   * Marque une session à venir comme annulée.
   * @param sessionId L'identifiant unique de la session.
   */
  public cancelSession(sessionId: string): void {
    if (confirm("Êtes-vous sûr de vouloir annuler cette session ? Une notification sera envoyée à l'étudiant.")) {
      const sessionToCancel = this.sessions.find(s => s.sessionId === sessionId);
      if (sessionToCancel && sessionToCancel.status === 'Upcoming') {
        sessionToCancel.status = 'Cancelled';
        // Simulation de la mise à jour (en production, cela ferait un appel API)
        console.log(`Session ${sessionId} annulée.`);
        
        // Rafraîchir les listes après la modification
        this.filterSessions(); 
        
      } else {
        alert("Impossible d'annuler une session qui n'est pas 'À Venir'.");
      }
    }
  }

  /**
   * Confirme/Démarre une session (action souvent faite au début de l'heure).
   * @param sessionId L'identifiant unique de la session.
   */
  public startSession(sessionId: string): void {
      const sessionToStart = this.sessions.find(s => s.sessionId === sessionId);
      if (sessionToStart && sessionToStart.status === 'Upcoming') {
        // En production, cela ouvrirait une salle de classe virtuelle et mettrait le statut sur 'In Progress'
        alert(`Démarrage de la session ${sessionToStart.topic} avec ${sessionToStart.studentName}.`);
        // Pour la démo, nous ne changeons pas le statut ici pour la garder dans la liste 'Upcoming'
      }
  }

}
