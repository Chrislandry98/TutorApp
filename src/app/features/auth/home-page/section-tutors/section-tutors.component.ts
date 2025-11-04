import { Component, OnInit } from '@angular/core';
import { TuteurInfo } from '../../../../models/homepagemodels/tuteur-info';
import { TuteurStats } from '../../../../models/homepagemodels/tuteur-stats';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-section-tutors',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './section-tutors.component.html',
  styleUrl: './section-tutors.component.css'
})
export class SectionTutorsComponent implements OnInit{
  // Tableau de données des tuteurs
  tuteurs: TuteurInfo[] = [];
  
  // Tableau de données des statistiques
  stats: TuteurStats[] = [
    { valeur: '500+', libelle: 'Tuteurs vérifiés' },
    { valeur: '10K+', libelle: 'Sessions complétées' },
    { valeur: '4.8/5', libelle: 'Note moyenne' },
    { valeur: '95%', libelle: 'Taux de satisfaction' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Simuler la récupération des données depuis un service/API
    this.tuteurs = this.chargerTuteurs();
  }

  // Simulation de la fonction de chargement des données
  private chargerTuteurs(): TuteurInfo[] {
    return [
      {
        id: 1, nom: 'Alain Foka', matiere: 'Mathématiques', note: 4.9, avis: 127, prixHeure: 35,
        badge: 'Top Tuteur', photoUrl: 'images-Homepage/tuteurs/tuteur1.png'
      },
      {
        id: 2, nom: 'Takam Chris', matiere: 'Physique', note: 4.8, avis: 98, prixHeure: 32,
        badge: 'Populaire', photoUrl: 'images-Homepage/tuteurs/tuteur2.png'
      },
      {
        id: 3, nom: 'Marie Ngouñou', matiere: 'Anglais', note: 5, avis: 156, prixHeure: 30,
        badge: 'Meilleur Choix', photoUrl: 'images-Homepage/tuteurs/tuteur3.png'
      }
    ];
  }
}
