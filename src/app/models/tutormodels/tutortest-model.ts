// Interface représentant la structure des données d'un tuteur pour le test sur la vue
export interface TutorTest {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  bio: string;
  subjects: string[];
  photoUrl: string;
  isAvailable: boolean;
}