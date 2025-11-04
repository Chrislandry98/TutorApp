import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

export interface TimeSlot {
  id: number;
  startTime: string; // Ex: '3:00 PM'
  endTime: string;   // Ex: '4:00 PM'
  duration: number;  // Ex: 60 (en minutes)
  status: 'Available' | 'Booked' | 'Disabled'; // Pour la gestion future
}

@Component({
  selector: 'app-tutor-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './tutor-schedule.component.html',
  styleUrl: './tutor-schedule.component.css'
})

export class TutorScheduleComponent implements OnInit {
  // --- PROPRIÉTÉS DU COMPOSANT ---

  private router = inject(Router)
  
  public selectedDate: string = 'Monday, March 25, 2024';
  
  public availableSlots: TimeSlot[] = [
    // Note : J'ai mis les heures au format 24h pour le tri. Le HTML type="time" gère l'affichage local.
    { id: 1, startTime: '15:00', endTime: '16:00', duration: 60, status: 'Available' },
    { id: 2, startTime: '16:00', endTime: '17:00', duration: 60, status: 'Available' },
  ];

  // Modèle pour le nouveau créneau à créer (pour le formulaire de la modale)
  public newSlot: { date: string, startTime: string, endTime: string } = {
    date: '', // format YYYY-MM-DD (car type="date" HTML)
    startTime: '', // format HH:MM (car type="time" HTML)
    endTime: ''
  };

  // Propriété pour contrôler l'affichage de la modale
  public showModal: boolean = false; 

  // --- CYCLES DE VIE ---

  constructor() { }

  ngOnInit(): void {
    // Dans une application réelle, vous feriez l'appel API initial ici.
  }

  // --- MÉTHODES DE GESTION DE LA PAGE ---

  // Simule le retour au tableau de bord
  public backToDashboard(): void {
    console.log('Naviguer vers /dashboard');
    this.router.navigate(['tutor/dashboard']);
  }

  // Ouvre la modale et réinitialise le formulaire
  public addTimeSlot(): void {
    this.showModal = true;
    this.resetNewSlot();
  }
  
  // Ferme la modale et réinitialise le formulaire
  public closeModal(): void {
    this.showModal = false;
    this.resetNewSlot();
  }
  
  // Réinitialise le modèle du formulaire
  private resetNewSlot(): void {
    this.newSlot = { date: '', startTime: '', endTime: '' };
  }

  // Fonction pour supprimer un créneau
  public deleteSlot(slotId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce créneau ?')) {
      // Filtrage du tableau pour déclencher la mise à jour de la vue (*ngFor)
      this.availableSlots = this.availableSlots.filter(slot => slot.id !== slotId);
      console.log(`Créneau ${slotId} supprimé.`);
    }
  }
  
  // --- MÉTHODES DE GESTION DU CRÉNEAU (MODALE) ---

  // Soumet et ajoute le nouveau créneau à la liste
  public saveNewSlot(): void {
    // 1. Validation de base
    if (!this.newSlot.date || !this.newSlot.startTime || !this.newSlot.endTime) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    // 2. Calcul de la durée
    const duration = this.calculateDuration(this.newSlot.startTime, this.newSlot.endTime);
    
    // 3. Création du nouvel objet TimeSlot
    const newSlotObject: TimeSlot = {
      id: Date.now(), // ID unique
      startTime: this.newSlot.startTime,
      endTime: this.newSlot.endTime,
      duration: duration,
      status: 'Available'
    };

    // 4. Ajout de l'objet au tableau (Mise à jour dynamique)
    this.availableSlots.push(newSlotObject);
    
    // 5. Trier le tableau par heure de début
    this.availableSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));

    console.log(`Nouveau créneau ajouté pour le ${this.newSlot.date} : ${newSlotObject.startTime}`);

    // 6. Fermer la modale et réinitialiser
    this.showModal = false;
    this.resetNewSlot();
  }

  /**
   * Calcule la durée en minutes entre l'heure de début et l'heure de fin (format HH:MM).
   * @returns La durée en minutes.
   */
  private calculateDuration(start: string, end: string): number {
    try {
      // Split HH:MM
      const [startHours, startMinutes] = start.split(':').map(Number);
      const [endHours, endMinutes] = end.split(':').map(Number);

      // Convertir tout en minutes depuis minuit
      const totalStartMinutes = startHours * 60 + startMinutes;
      const totalEndMinutes = endHours * 60 + endMinutes;

      let duration = totalEndMinutes - totalStartMinutes;

      // Gérer le cas où l'heure de fin est le jour suivant (si nécessaire, mais on suppose ici que ce n'est pas le cas)
      if (duration < 0) {
        duration += 24 * 60; // Ajouter 24 heures
      }
      
      return duration;
    } catch (e) {
      console.error("Erreur lors du calcul de la durée. Retourne 60 minutes par défaut.");
      return 60; 
    }
  }
}
