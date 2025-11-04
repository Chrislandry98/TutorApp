import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Interfaces pour structurer les données du tuteur
interface Document {
  name: string;
  verified: boolean;
}

@Component({
  selector: 'app-tutor-profile',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './tutor-profile.component.html',
  styleUrl: './tutor-profile.component.css'
})
export class TutorProfileComponent implements OnInit {
  // Données du tuteur
  tutor = {
    name: 'Dr. Elena Petrova',
    rating: 4.9,
    reviews: 78,
    title: 'Experienced Math & Physics Tutor for University Students',
    validated: true,
    bio: "Dr. Elena Petrova is a highly dedicated and experienced tutor specializing in advanced mathematics and physics. With a Ph.D. in Theoretical Physics from a prestigious university, she has over 10 years of teaching experience, helping students grasp complex concepts and excel in their studies. Elena believes in a patient, analytical approach, tailoring lessons to each student's unique learning style. She is passionate about making science and math accessible and enjoyable, inspiring confidence and critical thinking. Her sessions are designed to not only clarify difficult topics but also to foster a love for learning in her students.",
    subjects: ['Calculus I', 'Calculus II', 'Linear Algebra', 'Differential Equations', 'Thermodynamics', 'Quantum Mechanics'],
    gradeLevels: ['University Level', 'Advanced Placement (AP)'],
    documents: [
      { name: 'Ph.D. Certificate - Theoretical Physics', verified: true },
      { name: 'Background Check (2023)', verified: true },
      { name: 'Teaching License - Higher Education', verified: true },
    ] as Document[]
  };

  // Logique du calendrier
  currentDate: Date = new Date(2025, 9, 1); // Début Octobre 2025 pour correspondre à l'image
  selectedDate: Date = new Date(2025, 9, 17); // Oct 17, 2025
  availableTimes: string[] = []; // Liste des heures disponibles pour la date sélectionnée
  
  // Calendrier (structure simplifiée pour l'affichage)
  calendarData: { day: number, isAvailable: boolean, isSelected: boolean }[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialisation du calendrier (logique simple pour l'exemple)
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendarData = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Remplissage du calendrier avec des données mockées
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = date.getDate() === this.selectedDate.getDate() && date.getMonth() === this.selectedDate.getMonth();
      // On rend les jours 16 et 17 indisponibles ou sélectionnés pour l'exemple
      const isAvailable = i !== 17 && i !== 16; 

      this.calendarData.push({ 
        day: i, 
        isAvailable: isAvailable, 
        isSelected: isSelected 
      });
    }
    
    // Mise à jour des heures disponibles pour la date sélectionnée
    this.updateAvailableTimes();
  }
  
  updateAvailableTimes(): void {
    const selectedDay = this.selectedDate.getDate();
    // Simuler l'indisponibilité pour Oct 17 (comme dans l'image)
    if (selectedDay === 17) {
      this.availableTimes = [];
    } else {
      this.availableTimes = ['9:00 AM', '10:30 AM', '1:00 PM', '3:00 PM'];
    }
  }

  // Fonctions de navigation du calendrier
  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }
  
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
  
  selectDay(day: number): void {
    this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    this.generateCalendar(); // Régénère pour mettre à jour l'état 'isSelected'
  }

  // Formatage du nom du mois
  getMonthName(): string {
    return this.currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  bookSession(): void {
    console.log(`Booking session with ${this.tutor.name} for ${this.selectedDate.toDateString()}`);
    alert('Session booking logic initiated.');
  }

}
