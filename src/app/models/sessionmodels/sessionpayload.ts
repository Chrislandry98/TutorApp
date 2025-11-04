export interface SessionPayload {
    tutorId: number;
    studentId: number;
    subject: string;
    startTime: string;
    durationInMinutes: number;
    location?: string;
}
