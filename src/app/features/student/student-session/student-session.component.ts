import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionDetailsComponent } from '../../../shared/components/session-details/session-details.component';
import { SessionDetail } from '../../../models/sessionmodels/session-detail';


// --- DÉFINITIONS LOCALES POUR LA DÉMO ---
// Adaptez l'interface Session de votre service pour qu'elle corresponde aux champs nécessaires
interface SessionList {
    id: string; // Utilisé pour l'identification
    studentName: string;
    tutorName: string;
    topic: string;
    date: string; // Chaîne brute pour l'affichage initial
    duration: number;
    status: 'confirmed' | 'upcoming' | 'completed' | 'cancelled';
    hourlyRate: number;
    tutorPhotoUrl: string;
    paymentStatus: 'paid' | 'pending' | 'refunded';
    cost: number;
    // ... autres champs nécessaires pour la carte de liste
}

type SessionFilterType = 'All Sessions' | 'Upcoming' | 'Completed' | 'Cancelled';

// Assurez-vous d'avoir une implémentation de SessionDetail dans un fichier partagé ou ici

@Component({
  selector: 'app-student-session',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, SessionDetailsComponent],
  templateUrl: './student-session.component.html',
  styleUrl: './student-session.component.css'
})
export class StudentSessionComponent implements OnInit{
// Injecter le service (décommenter si le service est disponible)
// private sessionService = inject(SessionService); 

  public allSessions: SessionList[] = []; 
  public filteredSessions: SessionList[] = [];
  public activeFilter: 'All Sessions' | 'Upcoming' | 'Completed' | 'Cancelled' = 'All Sessions';

  // 🔑 Propriété pour gérer l'affichage de la modale de détails
  public selectedSession: SessionDetail | null = null; 

  constructor() { }

  ngOnInit(): void {
    this.allSessions = this.loadAllSessions();
    this.filterSessions(this.activeFilter);
  } 

  // Simule le chargement des sessions 
  loadAllSessions() : SessionList[]{
    return [
      // Utilisation d'URLs d'images génériques pour la démo
      { id: '1', studentName: 'Alice Dubois', tutorName: 'Alain', topic: 'Calcul différentiel', date: '2025-11-06T14:00:00', duration: 60, status: 'upcoming', hourlyRate: 30, tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur1.png', paymentStatus: 'paid', cost: 30 },
      { id: '2', studentName: 'Bob Smith', tutorName: 'Landry', topic: 'Introduction à Python', date: '2025-10-28T10:00:00', duration: 90, status: 'completed', hourlyRate: 35, tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur2.png', paymentStatus: 'paid', cost: 52.50 },
      { id: '3', studentName: 'Charles Léger', tutorName: 'Marco', topic: 'Révision de l\'algèbre', date: new Date(new Date().getTime() + (10 * 60 * 1000)).toISOString(), duration: 45, status: 'upcoming', hourlyRate: 30, tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur1.png', paymentStatus: 'pending', cost: 22.50 },
      { id: '4', studentName: 'Alice Dubois', tutorName: 'Fred', topic: 'Statistiques', date: '2025-10-20T18:00:00', duration: 60, status: 'completed', hourlyRate: 30, tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur3.png', paymentStatus: 'paid', cost: 30 },
      { id: '5', studentName: 'Danielle F.', tutorName: 'Anna', topic: 'Géométrie', date: '2025-11-02T11:00:00', duration: 60, status: 'cancelled', hourlyRate: 30, tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur1.png', paymentStatus: 'refunded', cost: 30 },
    ] as SessionList[]; 
  }

  filterSessions(filter: string): void {
    // On caste la valeur entrante pour mettre à jour la propriété de classe avec le type correct.
    this.activeFilter = filter as SessionFilterType;
    
    if (filter === 'All Sessions') {
      this.filteredSessions = this.allSessions;
    } else {
      let statusToFilter: string[] = [];
      if (filter === 'Upcoming') {
        // Inclure 'confirmed' et 'upcoming' dans la catégorie 'Upcoming' de l'UI
        statusToFilter = ['confirmed', 'upcoming']; 
      } else {
        statusToFilter = [filter.toLowerCase()];
      }
      
      this.filteredSessions = this.allSessions.filter(session => 
        (statusToFilter as string[]).includes(session.status)
      );
    }
  }

  // LOGIQUE D'OUVERTURE DE LA MODALE
  public openSessionDetails(sessionId: string): void {
    const sessionListEntry = this.allSessions.find(s => s.id === sessionId);

    if (sessionListEntry) {
      // Construction de l'objet SessionDetail
      this.selectedSession = {
        sessionId: sessionListEntry.id,
        topic: sessionListEntry.topic,
        studentName: sessionListEntry.studentName,
        tutorName: sessionListEntry.tutorName,
        dateTime: new Date(sessionListEntry.date), // CONVERSION CRITIQUE en objet Date
        duration: sessionListEntry.duration,
        zoomLink: 'https://zoom.us/j/demo12345' + sessionListEntry.id, 
        // Harmonisation du statut pour le composant enfant
        status: sessionListEntry.status === 'confirmed' || sessionListEntry.status === 'upcoming' ? 'Upcoming' : (sessionListEntry.status === 'completed' ? 'Completed' : 'Cancelled'),
        hourlyRate: sessionListEntry.hourlyRate,
        files: sessionListEntry.id === '1' ? 
            [{ name: 'Préparation.pdf', url: 'https://example.com/prep.pdf' }] : [], 
        // Données simulées pour le feedback (si complété)
        rating: sessionListEntry.id === '2' ? 4 : undefined,
        report: sessionListEntry.id === '2'? "Très bonne session, l'étudiant a bien compris la matière." : undefined,
      };
    } else {
      console.error(`Session avec ID ${sessionId} non trouvée.`);
    }
  }

  // LOGIQUE DE FERMETURE DE LA MODALE
  public closeSessionDetails(): void {
    this.selectedSession = null;
  }

  // Fonctions de simulation des actions
  reschedule(sessionId: string): void { console.log('Reschedule session:', sessionId); }
  cancel(sessionId: string): void { console.log('Cancel session:', sessionId); }
  viewTutor(sessionId: string): void { console.log('View tutor for session:', sessionId); }
  leaveReview(sessionId: string): void { 
    this.openSessionDetails(sessionId); 
    console.log('Opening details for review:', sessionId);
  }

  // Style des statuts de paiement
  getPaymentColor(status: SessionList['paymentStatus']): string {
    switch (status) {
      case 'paid': return 'text-success fw-bold';
      case 'pending': return 'text-warning fw-bold';
      case 'refunded': return 'text-danger fw-bold';
      default: return 'text-muted';
    }
  }
  
  // Style des badges de statut
  getStatusBadgeClass(status: SessionList['status']): string {
    switch (status) {
        case 'upcoming': 
        case 'confirmed': return 'bg-primary'; 
        case 'completed': return 'bg-success';
        case 'cancelled': return 'bg-danger';
        default: return 'bg-secondary';
    }
  }
}
