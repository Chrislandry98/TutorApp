import { Component } from '@angular/core';
import { Temoignage } from '../../../../models/homepagemodels/temoignage';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-section-student',
  standalone: true,
  imports: [NgFor],
  templateUrl: './section-student.component.html',
  styleUrl: './section-student.component.css'
})
export class SectionStudentComponent {

  temoignages: Temoignage[] = [
    {
      avis: "Grâce à TutorHub, j'ai amélioré mes notes en mathématiques de 15 points en seulement 2 mois!",
      auteur: 'Lucas,',
      details: 'Terminale S'
    },
    {
      avis: "Les tuteurs sont incroyables et la plateforme est super facile à utiliser. Je recommande à 100%!",
      auteur: 'Emma,',
      details: '1ère année université'
    },
    {
      avis: "J'ai trouvé le tuteur parfait pour m'aider avec mon mémoire. Service exceptionnel!",
      auteur: 'Alexandre,',
      details: 'Master 2'
    }
  ];
}
