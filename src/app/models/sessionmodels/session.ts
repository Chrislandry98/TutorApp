export interface Session {
    id: number;
    tutorName: string;
    subject:string;
    date: string;
    duration: number; // en minutes
    cost: number;
    paymentStatus: 'paid'| 'pending';
    status: 'confirmed' | 'completed'| 'cancelled' | 'upcoming';
    tutorPhotoUrl: string;
}
