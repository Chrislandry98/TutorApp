//Interface représenatnt la structure de données des transactions de compte d'un étudiant
export interface StudentTransaction {
  id_transaction: number;
  id_compte_fk: number;
  id_session_fk?: number;     // Optionnel : lié à une session (pour gain/dépense)
  id_recharge_fk?: number;    // Optionnel : lié à une recharge (pour gain)
  description: string;
  date: Date;
  amount: number;
  type: 'Recharge' | 'Payment';
}

