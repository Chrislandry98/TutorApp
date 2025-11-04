//Interface représenatnt la structure de données d'une session suivie par un étudiant
export interface StudentSession {
  tutorName: string;
  subject: string;
  duration: number; // en minutes
  date: string; // Format JJ/MM/AAAA
  status: 'confirmed' | 'pending' | 'completed';
  tutorPhotoUrl: string;
}
