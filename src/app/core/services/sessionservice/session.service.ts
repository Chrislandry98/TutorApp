import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { SessionPayload } from '../../../models/sessionmodels/sessionpayload';
import { Session } from '../../../models/sessionmodels/session';
import { StudentTransaction } from '../../../models/studentmodels/student-transaction';

@Injectable({
  providedIn: 'root'
})
export class SessionService{
  // Injection moderne du HttpClient et configuration de l'URL
    private http = inject(HttpClient); 
    private apiUrl = '/api/v1/sessions'; 

    // ------------------------------------------------------------------------
    // Gestion des erreurs
    // ------------------------------------------------------------------------

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Une erreur inconnue est survenue!';
        
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Erreur client: ${error.error.message}`;
        } else {
            // Le backend a retourné un code d'erreur HTTP.
            const apiMessage = error.error?.message || error.statusText;
            errorMessage = `Erreur API - Code: ${error.status}, Message: ${apiMessage}`;
            console.error('Erreur retournée par le backend:', error);
        }
        
        return throwError(() => new Error(errorMessage));
    }

    // ------------------------------------------------------------------------
    // Opérations de Planification et CRUD
    // ------------------------------------------------------------------------

    /**
     * Planifie (crée) une nouvelle session de tutorat.
     * @param sessionPayload Les détails de la session (tuteur, étudiant, heure, durée).
     * @returns Observable<Session> La session créée, y compris son ID.
     */
    scheduleSession(sessionPayload: SessionPayload): Observable<Session> {
        return this.http.post<Session>(this.apiUrl, sessionPayload)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Récupère une session par son ID.
     * @param sessionId L'ID de la session.
     * @returns Observable<Session>
     */
    getSessionById(sessionId: number): Observable<Session> {
        const url = `${this.apiUrl}/${sessionId}`;
        return this.http.get<Session>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Récupère toutes les sessions pour un utilisateur donné (étudiant ou tuteur).
     * @param userId L'ID de l'utilisateur (étudiant ou tuteur).
     * @param role Le rôle de l'utilisateur ('student' ou 'tutor').
     * @returns Observable<Session[]> La liste des sessions.
     */
    getSessionsByUserId(userId: number, role: 'student' | 'tutor'): Observable<Session[]> {
        // Ex: /api/v1/sessions?role=student&userId=123
        const url = `${this.apiUrl}?${role}Id=${userId}`;
        return this.http.get<Session[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Annule une session existante.
     * Note: Le backend est responsable de définir le statut sur 'CANCELLED'.
     * @param sessionId L'ID de la session à annuler.
     * @returns Observable<Session> La session mise à jour (statut CANCELLED).
     */
    cancelSession(sessionId: number): Observable<Session> {
        // Utilise PUT ou PATCH pour mettre à jour le statut, selon l'API
        const url = `${this.apiUrl}/${sessionId}/cancel`; 
        return this.http.put<Session>(url, {}) // Le corps de la requête peut être vide si l'API l'accepte
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Met à jour le statut d'une session (ex: de SCHEDULED à COMPLETED).
     * @param sessionId L'ID de la session.
     * @param newStatus Le nouveau statut.
     * @returns Observable<Session>
     */
    updateSessionStatus(sessionId: number, newStatus: Session['status']): Observable<Session> {
        const url = `${this.apiUrl}/${sessionId}/status`;
        return this.http.patch<Session>(url, { status: newStatus })
            .pipe(
                catchError(this.handleError)
            );
    }

    //Test ////////////////////////////////////////
    getSessionTest(): Session[]{
      return [
        {
          id: 1, studentName: 'Landry', tutorName: 'Sarah Johnson', subject: 'Calculus', date: 'Mar 14, 2024',
          duration: 60, cost: 45.00, paymentStatus: 'paid', status: 'confirmed', 
          tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur1.png' // Image du tuteur
        },
        {
          id: 2, studentName: 'Landry', tutorName: 'John Martinez', subject: 'Physics', date: 'Mar 9, 2024',
          duration: 90, cost: 75.00, paymentStatus: 'paid', status: 'completed',
          tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur2.png'
        },
        {
          id: 3, studentName: 'Landry',  tutorName: 'Emma Chen', subject: 'English Literature', date: 'Mar 25, 2024',
          duration: 45, cost: 30.00, paymentStatus: 'pending', status: 'upcoming',
          tutorPhotoUrl: 'images-Homepage/tuteurs/tuteur3.png'
        },
        {
          id: 4, studentName: 'Landry',  tutorName: 'Michael Brown', subject: 'Programming', date: 'Mer 11, 2025',
          duration: 60, cost: 55.00, paymentStatus: 'paid', status: 'cancelled',
          tutorPhotoUrl: 'assets/tutors/michael_brown.jpg'
        }
      ];
    }
}
