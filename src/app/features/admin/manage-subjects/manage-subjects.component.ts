import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Subject {
  id: number;
  name: string;
  associatedTutors: number; // Nombre de tuteurs associés à ce sujet
}

export interface Level {
  id: number;
  name: string;
  associatedTutors: number; // Nombre de tuteurs associés à ce niveau
}

@Component({
  selector: 'app-manage-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-subjects.component.html',
  styleUrl: './manage-subjects.component.css'
})
export class ManageSubjectsComponent implements OnInit{
  // --- Données de Base ---
  public subjects: Subject[] = [
    { id: 1, name: 'Mathematics', associatedTutors: 12 },
    { id: 2, name: 'Physics', associatedTutors: 8 },
  ];

  public levels: Level[] = [
    { id: 10, name: 'High School', associatedTutors: 25 },
    { id: 20, name: 'College', associatedTutors: 15 },
  ];
  
  // --- Modèles de Formulaires ---
  public newSubjectName: string = '';
  public newLevelName: string = '';
  
  // Propriétés qui peuvent être null
  public editingSubject: Subject | null = null;
  public editingLevel: Level | null = null;

  constructor() { }

  ngOnInit(): void { }

  // ------------------------------------------
  // --- LOGIQUE DE GESTION DES MATIÈRES (SUBJECTS) ---
  // ------------------------------------------

  public addSubject(): void {
    if (!this.newSubjectName.trim()) return;

    const newId = Math.max(...this.subjects.map(s => s.id), 0) + 1;
    const newSubject: Subject = {
      id: newId,
      name: this.newSubjectName.trim(),
      associatedTutors: 0 
    };
    this.subjects.push(newSubject);
    this.newSubjectName = ''; 
  }

  public startEditSubject(subject: Subject): void {
    this.editingSubject = { ...subject }; 
  }

  public saveEditSubject(): void {
    // Vérification de nullité
    if (this.editingSubject && this.editingSubject.name.trim()) {
      const index = this.subjects.findIndex(s => s.id === this.editingSubject!.id);
      if (index !== -1) {
        this.subjects[index] = this.editingSubject;
      }
      this.editingSubject = null; 
    }
  }

  public deleteSubject(subjectId: number): void {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjects = this.subjects.filter(s => s.id !== subjectId);
    }
  }

  // ------------------------------------------
  // --- LOGIQUE DE GESTION DES NIVEAUX (LEVELS) ---
  // ------------------------------------------

  public addLevel(): void {
    if (!this.newLevelName.trim()) return;

    const newId = Math.max(...this.levels.map(l => l.id), 0) + 1;
    const newLevel: Level = {
      id: newId,
      name: this.newLevelName.trim(),
      associatedTutors: 0
    };
    this.levels.push(newLevel);
    this.newLevelName = '';
  }

  public startEditLevel(level: Level): void {
    this.editingLevel = { ...level };
  }

  public saveEditLevel(): void {
    // Vérification de nullité
    if (this.editingLevel && this.editingLevel.name.trim()) {
      const index = this.levels.findIndex(l => l.id === this.editingLevel!.id);
      if (index !== -1) {
        this.levels[index] = this.editingLevel;
      }
      this.editingLevel = null; 
    }
  }

  public deleteLevel(levelId: number): void {
    if (confirm('Are you sure you want to delete this level?')) {
      this.levels = this.levels.filter(l => l.id !== levelId);
    }
  }

}
