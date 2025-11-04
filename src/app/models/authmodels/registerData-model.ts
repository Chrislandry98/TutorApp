export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role: 'ETUDIANT' | 'TUTEUR';
  bio?: string;
  hourlyRate?: number;
  subjects?: string[];
}
