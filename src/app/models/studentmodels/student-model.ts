// Interface représentant la structure des données d'un étudiant (telles que retournées par l'API)
export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string; // Optionnel
    registrationDate: Date;
    gradelevel: string;
    // ... autres propriétés spécifiques à l'étudiant
}
