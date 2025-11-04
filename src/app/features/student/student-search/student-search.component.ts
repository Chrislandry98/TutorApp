import { Component, inject, NgModule } from '@angular/core';
import { TutorTest } from '../../../models/tutormodels/tutortest-model';
import { CommonModule, NgFor} from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TutorService } from '../../../core/services/tutorservice/tutor-service.service';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink, FormsModule],
  templateUrl: './student-search.component.html',
  styleUrl: './student-search.component.css'
})
export class StudentSearchComponent {

  private tutorService = inject(TutorService)

  // Variables qui contiendront les valeurs, reinitialiséés a 0 à chaque fois
  tutors: TutorTest[] = [];
  searchTerm: string = '';
  selectedSubject: string = 'All Subjects';
  selectedGrade: string = 'All Grades';
  tutorsFound: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.tutors = this.loadTutors();
    this.tutorsFound = this.tutors.length;
  }

  loadTutors(): TutorTest[]{ 
     return this.tutorService.getTutorTest();
  }

  // Cette méthode serait utilisée pour filtrer la liste en fonction des sélections
  applyFilters(): void {
    // Charger la liste complète (ou utiliser une variable d'état pour la liste originale)
  const originalTutors = this.loadTutors(); 
  
  // Convertir le terme de recherche en minuscules une seule fois
  const term = this.searchTerm.toLowerCase().trim();

  // Filtrer la liste
  const filteredTutors = originalTutors.filter(tutor => {
    let matchesSearchTerm = true;
    let matchesSubject = true;
    let matchesGrade = true;

    // 1. Filtrage par Terme de Recherche (Nom ou Sujet)
    if (term) {
      // Vérifie si le terme correspond au nom du tuteur OU à l'un de ses sujets
      const subjectMatch = tutor.subjects.some((subject: string) => 
        subject.toLowerCase().includes(term)
      );
      const nameMatch = tutor.name.toLowerCase().includes(term);

      matchesSearchTerm = nameMatch || subjectMatch;
    }

    // 2. Filtrage par Sujet Sélectionné (Dropdown)
    if (this.selectedSubject !== 'All Subjects') {
      matchesSubject = tutor.subjects.includes(this.selectedSubject);
    }

    // 3. Filtrage par Niveau Sélectionné (Dropdown - Simulation)
    // NOTE : Le niveau n'est pas dans l'interface Tutor, c'est une simulation.
    // En production, vous auriez une propriété 'grade' sur l'interface Tutor.
    if (this.selectedGrade !== 'All Grades') {
      // Pour cet exemple, nous simulons que seuls 'Sarah Johnson' et 'Emma Chen' sont High School
      if (this.selectedGrade === 'High School') {
        matchesGrade = (tutor.name === 'Sarah Johnson' || tutor.name === 'Emma Chen');
      } else if (this.selectedGrade === 'University') {
        matchesGrade = (tutor.name === 'John Martinez' || tutor.name === 'Michael Brown');
      } else {
        matchesGrade = true;
      }
    }


    // Le tuteur est inclus si TOUTES les conditions sont vraies
    return matchesSearchTerm && matchesSubject && matchesGrade;
  });

    // Mettre à jour la liste affichée et le compteur
    this.tutors = filteredTutors;
    this.tutorsFound = filteredTutors.length;
  }

  // Simuler la recherche lorsque l'utilisateur tape
  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }
}
