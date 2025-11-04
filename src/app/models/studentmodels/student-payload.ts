// Interface pour les données de création/mise à jour d'un étudiant (peut être légèrement différente)
export interface StudentPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
}

