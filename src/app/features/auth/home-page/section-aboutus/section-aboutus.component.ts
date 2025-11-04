import { Component } from '@angular/core';
import { Feature } from '../../../../models/homepagemodels/feature';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-section-aboutus',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './section-aboutus.component.html',
  styleUrl: './section-aboutus.component.css'
})
export class SectionAboutusComponent {
  features: Feature[] = [
    {
      titre: 'Tuteurs vérifiés',
      description: 'Tous nos tuteurs sont vérifiés avec documents validés pour ta sécurité.',
      icone: 'shield-check',
      couleur: 'blue-icon-bg' // Classe CSS personnalisée pour le dégradé bleu-violet
    },
    {
      titre: 'Toutes les matières',
      description: 'Du lycée à l\'université, trouve des experts dans tous les domaines.',
      icone: 'book',
      couleur: 'green-icon-bg' // Classe CSS personnalisée pour le vert-lime
    },
    {
      titre: 'Horaires flexibles',
      description: 'Réserve des sessions qui s\'adaptent à ton emploi du temps.',
      icone: 'clock',
      couleur: 'purple-icon-bg' // Classe CSS personnalisée pour le violet-rose
    },
    {
      titre: 'Résultats garantis',
      description: '95% de nos étudiants améliorent leurs notes en 3 mois.',
      icone: 'graph-up-arrow',
      couleur: 'orange-icon-bg' // Classe CSS personnalisée pour l'orange
    }
  ];
}
