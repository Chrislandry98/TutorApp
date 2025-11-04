import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tutor-shell',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor],
  templateUrl: './tutor-shell.component.html',
  styleUrl: './tutor-shell.component.css'
})
export class TutorShellComponent {
  navLinks = [
    { label: 'Dashboard', path: '/tutor/dashboard', icon: 'bi-house' },
    { label: 'Mon Agenda', path: '/tutor/schedule', icon: 'bi-calendar-check' },
    { label: 'Mes Étudiants', path: '/tutor/students', icon: 'bi-people' },
    { label: 'Gains', path: '/tutor/earnings', icon: 'bi-currency-dollar' },
    { label: 'Docs', path: '/tutor/documents', icon: 'bi-book' },
    { path: '/tutor/messages', icon: 'bi-chat', label: 'Mes messages' },
    
  ];
}
