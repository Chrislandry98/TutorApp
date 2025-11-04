import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { Tutor } from '../../../models/tutormodels/tutor-model';
import { TutorPayload } from '../../../models/tutormodels/tutor-payload';
import { TutorTest } from '../../../models/tutormodels/tutortest-model';

@Injectable({
  providedIn: 'root'
})
export class TutorService{
// Injection moderne du HttpClient
    private http = inject(HttpClient); 
    
    // URL de base de votre API backend pour les tuteurs
    private apiUrl = '/api/v1/tutors'; 

    // ------------------------------------------------------------------------
    // Gestion des erreurs
    // ------------------------------------------------------------------------

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Une erreur inconnue est survenue!';
        
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client ou réseau
            errorMessage = `Erreur: ${error.error.message}`;
        } else {
            // Le backend a retourné un code d'erreur HTTP
            errorMessage = 
                `Erreur API - Code: ${error.status}, ` +
                `Message: ${error.error.message || error.statusText}`;
            
            console.error('Erreur retournée par le backend:', error);
        }
        
        // Retourne un Observable qui lance une erreur
        return throwError(() => new Error(errorMessage));
    }

    // ------------------------------------------------------------------------
    // Opérations CRUD (Create, Read, Update, Delete)
    // ------------------------------------------------------------------------

    /**
     * Récupère la liste de tous les tuteurs.
     * @returns Observable<Tutor[]>
     */
    getAllTutors(): Observable<Tutor[]> {
        return this.http.get<Tutor[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError) 
            );
    }

    /**
     * Récupère un tuteur par son ID.
     * @param id L'ID du tuteur.
     * @returns Observable<Tutor>
     */
    getTutorById(id: number): Observable<Tutor> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Tutor>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Crée un nouveau tuteur.
     * @param tutorPayload Les données du tuteur à créer.
     * @returns Observable<Tutor> Le tuteur créé avec son ID.
     */
    createTutor(tutorPayload: TutorPayload): Observable<Tutor> {
        return this.http.post<Tutor>(this.apiUrl, tutorPayload)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Met à jour un tuteur existant.
     * @param id L'ID du tuteur à mettre à jour.
     * @param tutorPayload Les nouvelles données du tuteur.
     * @returns Observable<Tutor> Le tuteur mis à jour.
     */
    updateTutor(id: number, tutorPayload: TutorPayload): Observable<Tutor> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Tutor>(url, tutorPayload)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Supprime un tuteur par son ID.
     * @param id L'ID du tuteur à supprimer.
     * @returns Observable<any>
     */
    deleteTutor(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    // ------------------------------------------------------------------------
    // Opération Spécifique (Exemple)
    // ------------------------------------------------------------------------

    /**
     * Récupère les tuteurs par matière enseignée.
     * @param subject La matière à rechercher.
     * @returns Observable<Tutor[]>
     */
    getTutorsBySubject(subject: string): Observable<Tutor[]> {
        const url = `${this.apiUrl}/search?subject=${subject}`;
        return this.http.get<Tutor[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }


    //Pour le test /////////////////////////////////////
    getTutorTest():TutorTest[] {
      return [
        {
          id: 1, name: 'Sarah Johnson', rating: 4.8, reviews: 127, pricePerHour: 45, photoUrl: 'images-Homepage/tuteurs/tuteur3.png', isAvailable: true,
          bio: 'Experienced math tutor with 8+ years helping students excel in algebra, calculus, and test prep.',
          subjects: ['Mathematics', 'Calculus']
        },
        {
          id: 2, name: 'John Martinez', rating: 4.9, reviews: 99, pricePerHour: 50, photoUrl: 'assets/tutors/john_martinez.jpg', isAvailable: true,
          bio: 'PhD in Physics with a passion for making complex concepts simple and engaging.',
          subjects: ['Physics', 'Chemistry']
        },
        {
          id: 3, name: 'Emma Chen', rating: 4.7, reviews: 156, pricePerHour: 40, photoUrl: 'assets/tutors/emma_chen.jpg', isAvailable: true,
          bio: 'Published author and educator specializing in essay writing and literary analysis.',
          subjects: ['English Literature', 'Writing']
        },
        {
          id: 4, name: 'Michael Brown', rating: 4.6, reviews: 45, pricePerHour: 55, photoUrl: 'images-Homepage/tuteurs/tuteur2.png', isAvailable: true,
          bio: 'Software engineer turned educator, teaching Python, Java, and web development.',
          subjects: ['Computer Science', 'Programming']
        },
        {
          id: 5, name: 'Chris Takam', rating: 3.6, reviews: 45, pricePerHour: 55, photoUrl: 'images-Homepage/tuteurs/tuteur1.png', isAvailable: false,
          bio: 'Post and Telecommunications Administrator.',
          subjects: ['Computer Science', 'Programming']
        }
        // Ajouter d'autres tuteurs ici...
      ];
    }
}
