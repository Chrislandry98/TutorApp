import { Component, inject } from '@angular/core';
import { StudentAcoountService } from '../../../core/services/studentservice/student-acoount.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-recharge',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, RouterLink],
  templateUrl: './student-recharge.component.html',
  styleUrl: './student-recharge.component.css'
})
export class StudentRechargeComponent {

  private studentAccountservice = inject(StudentAcoountService);

  currentBalance: number = 0; // Solde actuel de l'utilisateur
  selectedAmount: number = 50;     // Montant sélectionné (par défaut à 50)
  customAmount: number | null = null; // Montant personnalisé si l'option est choisie

  // Montants prédéfinis
  presetAmounts: number[] = [25, 50, 100, 200]; 
  
  constructor() { }

  ngOnInit(): void {
    // Si l'utilisateur a un montant personnalisé en cours, l'initialiser ici
    this.currentBalance = this.studentAccountservice.getBalance();
  }

  /**
   * Calcule le nouveau solde après la recharge
   */
  get newBalance(): number {
    const recharge = this.selectedAmount || this.customAmount || 0;
    return this.currentBalance + recharge;
  }

  /**
   * Gère le clic sur un montant prédéfini.
   */
  selectPreset(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  /**
   * Gère le changement dans le champ 'Custom Amount' et met à jour selectedAmount.
   */
  onCustomAmountChange(): void {
    if (this.customAmount !== null && this.customAmount > 0) {
      this.selectedAmount = this.customAmount;
    } else {
      this.selectedAmount = 0;
    }
  }

  /**
   * Logique pour soumettre le formulaire (à compléter avec un service de paiement)
   */
  submitRecharge(): void {
    const amountToRecharge = this.selectedAmount;
    if (amountToRecharge > 0) {
      console.log(`Recharging $${amountToRecharge.toFixed(2)} to account.`);
      // Ici, vous appelleriez votre service de paiement
      // Ex: this.paymentService.processPayment(amountToRecharge, 'Credit Card');
    } else {
      alert("Please select a valid recharge amount.");
    }
  }
}
