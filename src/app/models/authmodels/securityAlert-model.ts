export interface SecurityAlert {
  level: 'WARNING' | 'ERROR' | 'CRITICAL';
  message: string;
  actionRequired: boolean; // Si l'alerte nécessite une action (ex: re-connexion)
}
