// Interface pour les données de création/mise à jour d'un tuteur
export interface TutorPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    bio: string;
    hourlyRate: number;
    subjects: string[];
}