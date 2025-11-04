import { Component, Input } from '@angular/core';
import { StatsCardData } from '../tutor-dashboard.component';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
// Le décorateur @Input() reçoit les données du parent
  @Input() data!: StatsCardData;
}
