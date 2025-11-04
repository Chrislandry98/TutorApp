export type roleList = 'ETUDIANT'|'TUTEUR'|'ADMIN';

// Modèle pour l'utilisateur
export interface UserProfile {
  id: number;
  email: string;
  roles: roleList[]; // ['ETUDIANT', 'TUTEUR', 'ADMIN']
  firstName: string;
  // ... autres infos utiles pour le Front
}
