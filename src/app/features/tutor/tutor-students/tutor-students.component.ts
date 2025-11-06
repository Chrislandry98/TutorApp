import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionDetailsComponent } from '../../../shared/components/session-details/session-details.component';

// tutor.models.ts
export interface Session {
    sessionId: string;
    studentName: string;
    topic: string;
    date: string; // Chaîne brute (ex: '2025-11-10 14:00')
    duration: number; // en minutes
    status: 'Completed' | 'Upcoming' | 'Cancelled';
    hourlyRate: number;
}

// Modèle requis par le composant partagé SessionDetailsComponent
interface SessionDetail {
    sessionId: string;
    topic: string;
    studentName: string;
    tutorName: string;
    dateTime: Date; // Doit être un objet Date
    duration: number;
    zoomLink: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled'; 
    hourlyRate: number;
    files: { name: string; url: string; }[]; 
    rating?: number;
    report?: string;
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
  imports: [FormsModule, CommonModule, SessionDetailsComponent],
  templateUrl: './tutor-students.component.html',
  styleUrl: './tutor-students.component.css'
})

export class TutorStudentsComponent implements OnInit{

  public activeTab: 'sessions' | 'students' = 'sessions';
  
  // Propriété pour contrôler l'affichage de la modale de détails
  public selectedSession: SessionDetail | null = null; 
    
  // Données simulées
  public sessions: Session[] = [
    { sessionId: 'S001', studentName: 'Alice Dubois', topic: 'Calcul différentiel', date: '2025-11-10 14:00', duration: 60, status: 'Upcoming', hourlyRate: 30 },
    { sessionId: 'S002', studentName: 'Bob Smith', topic: 'Introduction à Python', date: '2025-10-28 10:00', duration: 90, status: 'Completed', hourlyRate: 35 },
    { sessionId: 'S003', studentName: 'Charles Léger', topic: 'Révision de l\'algèbre', date: '2025-11-05 15:00', duration: 45, status: 'Upcoming', hourlyRate: 30 },
    { sessionId: 'S004', studentName: 'Alice Dubois', topic: 'Statistiques', date: '2025-10-20 18:00', duration: 60, status: 'Completed', hourlyRate: 30 },
    { sessionId: 'S005', studentName: 'Danielle F.', topic: 'Géométrie', date: '2025-11-02 11:00', duration: 60, status: 'Cancelled', hourlyRate: 30 },
  ];

  public students: StudentInfo[] = [
    { studentId: 'E01', name: 'Alice Dubois', level: 'Collège - Secondaire 5', sessionsCount: 2 },
    { studentId: 'E02', name: 'Bob Smith', level: 'Université - 1ère année', sessionsCount: 1 },
    { studentId: 'E03', name: 'Charles Léger', level: 'Lycée - 1ère', sessionsCount: 1 },
  ];

  public upcomingSessions: Session[] = [];
  public completedSessions: Session[] = [];
  public cancelledSessions: Session[] = []; 

  ngOnInit(): void {
    this.filterSessions();
  }

  public setActiveTab(tab: 'sessions' | 'students'): void {
    this.activeTab = tab;
  }
  
  private filterSessions(): void {
    this.upcomingSessions = this.sessions.filter(s => s.status === 'Upcoming');
    this.completedSessions = this.sessions.filter(s => s.status === 'Completed');
    this.cancelledSessions = this.sessions.filter(s => s.status === 'Cancelled');
  }

  /**
   * Ouvre la modale des détails de la session après avoir mappé les données.
   * @param sessionId L'identifiant unique de la session.
   */
  public openSessionDetails(sessionId: string): void {
    const sessionListEntry = this.sessions.find(s => s.sessionId === sessionId);

    if (sessionListEntry) {
      // Construction de l'objet SessionDetail
      this.selectedSession = {
        sessionId: sessionListEntry.sessionId,
        topic: sessionListEntry.topic,
        studentName: sessionListEntry.studentName,
        tutorName: 'Vous', // Le tuteur est l'utilisateur courant
        // CONVERSION CRITIQUE: de la chaîne de date/heure en objet Date
        dateTime: new Date(sessionListEntry.date.replace(' ', 'T')), 
        duration: sessionListEntry.duration,
        zoomLink: 'https://meeting.link/salle-' + sessionListEntry.sessionId,
        status: sessionListEntry.status,
        hourlyRate: sessionListEntry.hourlyRate,
        files: sessionListEntry.sessionId === 'S001' ? 
               [{ name: 'Matériel de prép.pdf', url: '#' }] : [],
        rating: sessionListEntry.status === 'Completed' ? 5 : undefined,
        report: sessionListEntry.status === 'Completed' ? 
                `Excellent travail sur le sujet '${sessionListEntry.topic}'. L'étudiant(e) a montré une grande amélioration. Note : A.` : undefined,
      };
    } else {
      console.error(`[ERREUR] Session avec ID ${sessionId} non trouvée.`);
    }
  }

  /**
   * Ferme la modale des détails.
   */
  public closeSessionDetails(): void {
    this.selectedSession = null;
  }
  
  /**
   * Marque une session à venir comme annulée.
   * @param sessionId L'identifiant unique de la session.
   */
  public cancelSession(sessionId: string): void {
    // Remplacement de confirm()
    console.warn(`[SIMULATION MODALE] Demande de confirmation d'annulation pour la session ${sessionId}.`); 
    
    // --- Logique d'annulation (simulée après confirmation) ---
    const sessionToCancel = this.sessions.find(s => s.sessionId === sessionId);
    if (sessionToCancel && sessionToCancel.status === 'Upcoming') {
      sessionToCancel.status = 'Cancelled';
      console.log(`[ACTION] Session ${sessionId} annulée. Notification envoyée à l'étudiant.`);
      this.filterSessions(); 
    } else {
      console.error("[ERREUR] Impossible d'annuler une session qui n'est pas 'À Venir' ou non trouvée.");
    }
  }

  /**
   * Confirme/Démarre une session.
   * @param sessionId L'identifiant unique de la session.
   */
  public startSession(sessionId: string): void {
      const sessionToStart = this.sessions.find(s => s.sessionId === sessionId);
      if (sessionToStart && sessionToStart.status === 'Upcoming') {
        // Remplacement de alert()
        console.log(`[ACTION] Démarrage de la session ${sessionToStart.topic} avec ${sessionToStart.studentName}. Ouverture de la salle virtuelle...`);
      } else {
        console.error(`[ERREUR] Impossible de démarrer la session ${sessionId}.`);
      }
  }
  
}
