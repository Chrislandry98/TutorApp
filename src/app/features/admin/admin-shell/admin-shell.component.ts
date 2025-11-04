import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.css'
})
export class AdminShellComponent {

  public router = inject(Router)

  // Liens de navigation spécifiques à l'administrateur
  public navLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'bi-speedometer2' },
    { label: 'Validation Tuteurs', path: '/admin/tutors', icon: 'bi-patch-check' },
    { label: 'Gestion Utilisateurs', path: '/admin/users', icon: 'bi-people' },
    { label: 'Gestion Matières', path: '/admin/subjects', icon: 'bi-book' },
    { label: 'Transactions', path: '/admin/transactions', icon: 'bi-currency-dollar' },
    { label: 'Paramètres Admin', path: '/admin/settings', icon: 'bi-gear' },
  ];

}
