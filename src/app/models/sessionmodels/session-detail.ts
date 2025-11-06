export interface SessionDetail {
    sessionId: string;
    topic: string;
    studentName: string;
    tutorName: string;
    // NOTE: dateTime doit être un objet Date pour les calculs dans le TS
    dateTime: Date; 
    duration: number;
    zoomLink: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
    hourlyRate: number;
    // La liste de fichiers est optionnelle
    files?: { name: string, url: string }[];
    rating?: number;
    report?: string;
}

// Interface simplifiée pour la liste (si vous en avez une)
export interface SessionListEntry {
    id: string;
    date: string; // Stocké comme chaîne dans la liste
    topic: string;
    tutorName: string;
    // etc.
}