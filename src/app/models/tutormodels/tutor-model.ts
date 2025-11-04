// Interface représentant la structure des données d'un Tuteur (telles que retournées par l'API)

export interface Tutor {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    registrationDate: Date;
    bio: string;
    hourlyRate: number;
    subjects: string[]; // Liste des matières enseignées
    // ... autres propriétés spécifiques
}