import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor],
  templateUrl: './student-shell.component.html',
  styleUrl: './student-shell.component.css'
})
export class StudentShellComponent {

  public navLinks = [
    { path: '/student/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/student/search', icon: 'bi-search', label: 'Rechercher un Tuteur' },
    { path: '/student/session', icon: 'bi-calendar-check', label: 'Mes sessions' },
    { path: '/student/recharge', icon: 'bi-currency-dollar', label: 'Recharge' },
    { path: '/student/messages', icon: 'bi-chat', label: 'Mes messages' },
    
  ];

}
