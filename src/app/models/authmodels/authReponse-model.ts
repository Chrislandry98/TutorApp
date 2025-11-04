import { SecurityAlert} from "./securityAlert-model";
import { UserProfile } from "./userProfile-model";

// Réponse type du Backend après Connexion/Refresh
export interface AuthResponse {
  accessToken: string;
  tokenType: string; // 'Bearer'
  expiresIn: number; // Durée de validité du Access Token en secondes (ex: 3600)
  user: UserProfile; // Informations de base de l'utilisateur (rôles, ID, nom, etc.)
  securityAlert: SecurityAlert | null; // NOUVEAU: Alerte à afficher à l'utilisateur
}
