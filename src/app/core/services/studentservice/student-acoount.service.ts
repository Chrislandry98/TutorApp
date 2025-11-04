import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { StudentAccount } from '../../../models/studentmodels/student-account';
import { TransactionPayload } from '../../../models/studentmodels/transaction-payload';
import { StudentTransaction } from '../../../models/studentmodels/student-transaction';
import { StudentRecharge } from '../../../models/studentmodels/student-recharge';

@Injectable({
  providedIn: 'root'
})
export class StudentAcoountService {
private http = inject(HttpClient); 
    // Endpoint basé sur l'entité COMPTE et ses relations
    private baseUrl = '/api/v1/accounts'; 

    // ------------------------------------------------------------------------
    // Gestion des erreurs
    // ------------------------------------------------------------------------

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Une erreur est survenue lors de l\'opération sur le compte.';
        if (error.error?.message) {
            errorMessage = `Erreur API: ${error.error.message}`;
        } else if (error.status) {
             errorMessage = `Erreur HTTP ${error.status}.`;
        }
        console.error('Erreur du service de compte de points:', error);
        return throwError(() => new Error(errorMessage));
    }

    // ------------------------------------------------------------------------
    // A. Opérations du Compte Principal (COMPTE)
    // ------------------------------------------------------------------------

    /**
     * Récupère le solde et les informations du compte de points de l'étudiant.
     * @param studentId L'ID de l'étudiant (pour identifier le compte).
     * @returns Observable<StudentAccount>
     */
    getAccountByStudentId(studentId: number): Observable<StudentAccount> {
        // Ex: GET /api/v1/accounts/by-student/123
        const url = `${this.baseUrl}/by-student/${studentId}`;
        return this.http.get<StudentAccount>(url)
            .pipe(
                catchError(this.handleError) 
            );
    }

    /**
     * Récupère le solde actuel de points uniquement.
     * @param studentId L'ID de l'étudiant.
     * @returns Observable<number>
     */
    getPointsBalance(studentId: number): Observable<number> {
        // Ex: GET /api/v1/accounts/by-student/123/balance
        const url = `${this.baseUrl}/by-student/${studentId}/balance`;
        return this.http.get<number>(url)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    // ------------------------------------------------------------------------
    // B. Opérations de Transactions (TRANSACTION_POINT)
    // ------------------------------------------------------------------------

    /**
     * Récupère l'historique complet des transactions de points pour un compte.
     * @param accountId L'ID du compte (id_compte).
     * @returns Observable<PointTransaction[]>
     */
    getPointTransactions(accountId: number): Observable<StudentTransaction[]> {
        // Ex: GET /api/v1/accounts/123/transactions
        const url = `${this.baseUrl}/${accountId}/transactions`;
        return this.http.get<StudentTransaction[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    /**
     * Effectue une nouvelle transaction (gain ou dépense) sur le compte.
     * Le backend mettra automatiquement à jour le solde (solde_actuel).
     * @param payload Les détails de la transaction à enregistrer.
     * @returns Observable<PointTransaction> La transaction nouvellement créée.
     */
    recordTransaction(payload: TransactionPayload): Observable<StudentTransaction> {
        // Ex: POST /api/v1/accounts/transactions
        const url = `${this.baseUrl}/transactions`;
        return this.http.post<StudentTransaction>(url, payload)
            .pipe(
                catchError(this.handleError)
            );
    }

    // ------------------------------------------------------------------------
    // C. Opérations de Recharge (RECHARGE)
    // ------------------------------------------------------------------------
    
    /**
     * Récupère l'historique des recharges monétaires liées au compte.
     * @param accountId L'ID du compte (id_compte).
     * @returns Observable<Recharge[]>
     */
    getRechargeHistory(accountId: number): Observable<StudentRecharge[]> {
        // Ex: GET /api/v1/accounts/123/recharges
        const url = `${this.baseUrl}/${accountId}/recharges`;
        return this.http.get<StudentRecharge[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }
    
    /**
     * Envoie une requête pour initier une nouvelle recharge monétaire.
     * @param accountId L'ID du compte.
     * @param amount Le montant monétaire à payer.
     * @returns Observable<Recharge> L'objet Recharge initialisé (avant paiement).
     */
    initiateRecharge(accountId: number, amount: number): Observable<StudentRecharge> {
        // Ex: POST /api/v1/accounts/123/recharges
        const url = `${this.baseUrl}/${accountId}/recharges`;
        const payload = { montant_paiement: amount };
        
        return this.http.post<StudentRecharge>(url, payload)
            .pipe(
                catchError(this.handleError)
            );
    }




    /////////////////Test////////////////////////////////////////////////
    getBalance(): number{
       return 250.00;
    }

    getAllTransactions():StudentTransaction[]{
      return [
        {
          id_transaction: 1,
          id_compte_fk: 1,
          id_session_fk: undefined, // Non lié à une session
          id_recharge_fk: 10,        // Clé étrangère vers la première Recharge
          type: 'Recharge',  // Recharge = Crédit
          amount: 100,
          date: new Date('2024-02-29T10:00:00Z'),
          description: 'Achat de points via Recharge (Pack Standard)'
        },
        {
          id_transaction: 2,
          id_compte_fk: 2,
          id_session_fk: 55,         // Clé étrangère vers la Session payée
          id_recharge_fk: undefined, // Non lié à une recharge
          type: 'Payment',   // Paiement = Débit
          amount: -45,               // Note: Le montant est toujours positif dans l'objet, le signe est donné par 'type_mouvement'
          date: new Date('2024-03-14T15:30:00Z'),
          description: 'Paiement pour la session de Mathématiques (ID: 55)'
        },
        {
          id_transaction: 3,
          id_compte_fk: 3,
          id_session_fk: undefined,
          id_recharge_fk: 11,        // Clé étrangère vers la deuxième Recharge
          type: 'Recharge',
          amount: 200,
          date: new Date('2024-03-19T09:00:00Z'),
          description: 'Achat de points via Recharge (Pack Premium)'
        }
      ]
    }
}