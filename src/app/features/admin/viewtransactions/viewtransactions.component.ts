import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface TransactionSummary {
  totalRevenue: number;
  totalRecharges: number;
  totalBookings: number;
  pendingTransactions: number;
}

export interface TransactionRecord {
  id: string;
  user: string;
  type: 'Recharge' | 'Payment';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

@Component({
  selector: 'app-viewtransactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink ],
  templateUrl: './viewtransactions.component.html',
  styleUrl: './viewtransactions.component.css'
})
export class ViewtransactionsComponent implements OnInit {
  // 1. Données du Sommaire
  public summary: TransactionSummary = {
    totalRevenue: 15450.00,
    totalRecharges: 8200.00,
    totalBookings: 320,
    pendingTransactions: 12
  };
  
  // 2. Historique des Transactions
  public allTransactions: TransactionRecord[] = [
    { id: 'TXN001', user: 'Alice Wonderland', type: 'Payment', amount: 45.00, date: '2024-07-20', status: 'Completed' },
    { id: 'TXN002', user: 'Bob The Builder', type: 'Recharge', amount: 100.00, date: '2024-07-19', status: 'Completed' },
    { id: 'TXN003', user: 'Charlie Chaplin', type: 'Payment', amount: 75.00, date: '2024-07-18', status: 'Pending' },
    { id: 'TXN004', user: 'Diana Prince', type: 'Recharge', amount: 30.00, date: '2024-07-17', status: 'Failed' },
    { id: 'TXN005', user: 'Eve Harrington', type: 'Recharge', amount: 50.00, date: '2024-07-16', status: 'Completed' },
    { id: 'TXN006', user: 'Frank Underwood', type: 'Payment', amount: 60.00, date: '2024-07-15', status: 'Completed' },
    { id: 'TXN007', user: 'Grace Kelly', type: 'Recharge', amount: 120.00, date: '2024-07-14', status: 'Pending' },
  ];

  public filteredTransactions: TransactionRecord[] = [];
  public currentPage: number = 1;
  public transactionsPerPage: number = 5;
  public totalPages: number = 0;
  
  // 3. Modèle pour les Filtres
  public filters = {
    userSearch: '',
    startDate: '',
    endDate: '',
    transactionType: '',
    status: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.applyFilters(); // Initial load
  }

  // --- Logique de Filtrage et Pagination ---

  public applyFilters(): void {
    let tempTransactions = this.allTransactions;

    // Filtrage par nom d'utilisateur
    if (this.filters.userSearch) {
      const search = this.filters.userSearch.toLowerCase();
      tempTransactions = tempTransactions.filter(t => t.user.toLowerCase().includes(search));
    }
    // Filtrage par type
    if (this.filters.transactionType) {
      tempTransactions = tempTransactions.filter(t => t.type === this.filters.transactionType);
    }
    // Filtrage par statut
    if (this.filters.status) {
      tempTransactions = tempTransactions.filter(t => t.status === this.filters.status);
    }
    
    // NOTE: Le filtrage par date est omis pour la simplicité du code de démo.

    this.filteredTransactions = tempTransactions;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredTransactions.length / this.transactionsPerPage);
    this.paginateTransactions();
  }

  public resetFilters(): void {
    this.filters = {
      userSearch: '',
      startDate: '',
      endDate: '',
      transactionType: '',
      status: ''
    };
    this.applyFilters();
  }

  public paginateTransactions(): void {
    const start = (this.currentPage - 1) * this.transactionsPerPage;
    const end = start + this.transactionsPerPage;
    this.filteredTransactions = this.allTransactions.slice(start, end);
  }

  public goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateTransactions();
    }
  }

  public goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateTransactions();
    }
  }
  
  // --- Fonctions d'Affichage ---

  public formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  public getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-primary'; // Bleu pour Complété (comme sur l'image)
      case 'Pending': return 'bg-warning text-dark';
      case 'Failed': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
