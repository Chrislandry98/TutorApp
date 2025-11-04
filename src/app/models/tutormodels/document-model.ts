/** Types de documents prédéfinis (issus de l'entité TYPE_DOCUMENT du DER) */
export enum DocumentType {
  CERTIFICAT_DIPLOME = 'Certificat ou Diplôme',
  VERIFICATION_ANTECEDENTS = "Vérification d'Antécédents",
  LICENCE_ENSEIGNEMENT = "Licence d'Enseignement",
  PIECE_IDENTITE = "Pièce d'Identité"
}


export interface Document {
  name: string;      // Nom exact du document (Ex: 'Ph.D. Certificate - Theoretical Physics')
  type: DocumentType; // Utilise l'énumération (Ex: DocumentType.CERTIFICAT_DIPLOME)
  verified: boolean; // État de vérification
}
