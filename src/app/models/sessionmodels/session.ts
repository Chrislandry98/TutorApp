export interface Session {
    id: number;
    studentName:string,
    tutorName: string;
    subject:string;
    date: string;
    duration: number; // en minutes
    cost: number;
    paymentStatus: 'paid'| 'pending'| 'refunded';
    status: 'confirmed' | 'completed'| 'cancelled' | 'upcoming';
    tutorPhotoUrl: string;
}
