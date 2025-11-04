export interface StudentAccount {
    id_compte: number;
    id_etudiant_fk: number;     // Clé étrangère vers l'entité ETUDIANT
    solde_actuel: number;       // Le solde de points actuel
}
