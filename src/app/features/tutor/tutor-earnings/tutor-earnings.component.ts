import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// tutor.models.ts (suite)
export interface Transaction {
  id: string;
  type: 'Session' | 'Bonus' | 'Withdrawal';
  description: string;
  amount: number; // positif pour un gain, négatif pour un retrait
  date: string;
}

@Component({
  selector: 'app-tutor-earnings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutor-earnings.component.html',
  styleUrl: './tutor-earnings.component.css'
})
export class TutorEarningsComponent implements OnInit {
  public totalEarned: number = 0;
  public pendingBalance: number = 0; // Solde avant retrait
  
  public transactions: Transaction[] = [
    { id: 'T101', type: 'Session', description: 'Session avec Alice Dubois (60 min)', amount: 30.00, date: '2025-10-20' },
    { id: 'T102', type: 'Session', description: 'Session avec Bob Smith (90 min)', amount: 52.50, date: '2025-10-28' },
    { id: 'T103', type: 'Withdrawal', description: 'Retrait sur compte bancaire', amount: -100.00, date: '2025-11-01' },
    { id: 'T104', type: 'Bonus', description: 'Bonus de 5 sessions complétées', amount: 15.00, date: '2025-11-02' },
  ];

  ngOnInit(): void {
    this.calculateTotals();
  }

  private calculateTotals(): void {
    this.totalEarned = this.transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    this.pendingBalance = this.transactions
      .reduce((sum, t) => sum + t.amount, 0);
  }

  public requestPayout(): void {
    if (this.pendingBalance <= 0) {
      alert("Votre solde est insuffisant pour un retrait.");
      return;
    }
    // Logique API pour demander le retrait
    alert(`Demande de retrait de ${this.pendingBalance.toFixed(2)}$ envoyée.`);
  }
}
