import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Student } from '../../../models/studentmodels/student-model';
import { StudentPayload } from '../../../models/studentmodels/student-payload';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
// 💡 Injection moderne du HttpClient
    private http = inject(HttpClient); 
    
    // URL de base de votre API Spring Boot pour les étudiants
    // Assurez-vous que cette URL est correcte (ex: http://localhost:8080/api/v1/students)
    private apiUrl = '/api/v1/students'; 

    // ------------------------------------------------------------------------
    // Gestion des erreurs
    // ------------------------------------------------------------------------

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Une erreur inconnue est survenue!';
        
        if (error.error instanceof ErrorEvent) {
            // Erreur côté client ou réseau
            errorMessage = `Erreur: ${error.error.message}`;
        } else {
            // Le backend a retourné un code d'erreur HTTP.
            errorMessage = 
                `Erreur API - Code: ${error.status}, ` +
                `Message: ${error.error.message || error.statusText}`;
            
            // Loggez l'erreur pour le débogage côté développeur
            console.error('Erreur retournée par le backend:', error);
        }
        
        // Retourne un Observable avec un message d'erreur à gérer par le composant
        return throwError(() => new Error(errorMessage));
    }

    // ------------------------------------------------------------------------
    // Opérations CRUD (Create, Read, Update, Delete)
    // ------------------------------------------------------------------------

    /**
     * Récupère la liste de tous les étudiants.
     * @returns Observable<Student[]>
     */
    getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.apiUrl)
            .pipe(
                // Assure la gestion des erreurs HTTP
                catchError(this.handleError) 
            );
    }

    /**
     * Récupère un étudiant par son ID.
     * @param id L'ID de l'étudiant.
     * @returns Observable<Student>
     */
    getStudentById(id: number): Observable<Student> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Student>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Crée un nouvel étudiant.
     * @param studentPayload Les données de l'étudiant à créer.
     * @returns Observable<Student> L'étudiant créé avec son ID.
     */
    createStudent(studentPayload: StudentPayload): Observable<Student> {
        return this.http.post<Student>(this.apiUrl, studentPayload)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Met à jour un étudiant existant.
     * @param id L'ID de l'étudiant à mettre à jour.
     * @param studentPayload Les nouvelles données de l'étudiant.
     * @returns Observable<Student> L'étudiant mis à jour.
     */
    updateStudent(id: number, studentPayload: StudentPayload): Observable<Student> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Student>(url, studentPayload)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Supprime un étudiant par son ID.
     * @param id L'ID de l'étudiant à supprimer.
     * @returns Observable<any> (généralement une réponse vide ou un statut 204)
     */
    deleteStudent(id: number): Observable<any> {
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
     * Recherche des étudiants par nom ou email.
     * @param query Terme de recherche.
     * @returns Observable<Student[]>
     */
    searchStudents(query: string): Observable<Student[]> {
        const url = `${this.apiUrl}/search?q=${query}`;
        return this.http.get<Student[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }
}
