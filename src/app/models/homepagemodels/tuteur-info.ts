export interface TuteurInfo {
  id: number;
  nom: string;
  matiere: string;
  note: number;
  avis: number;
  prixHeure: number;
  badge: 'Top Tuteur' | 'Populaire' | 'Meilleur Choix';
  photoUrl: string; // Chemin vers l'image
}
