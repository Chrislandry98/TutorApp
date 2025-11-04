import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface TutorValidationItem {
  name: string;
  subjectExpertise: string;
  submittedOn: string;
  status: 'Pending' | 'Re-submission Required' | 'Reviewed';
  tutorId: number;
}


@Component({
  selector: 'app-review-tuteur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-tuteur.component.html',
  styleUrl: './review-tuteur.component.css'
})
export class ReviewTuteurComponent implements OnInit {
  public pendingTutors: TutorValidationItem[] = [
    { name: 'Alice Johnson', subjectExpertise: 'Mathematics, Physics', submittedOn: '2024-03-10', status: 'Pending', tutorId: 101 },
    { name: 'John Doe', subjectExpertise: 'Chemistry, Biology', submittedOn: '2024-03-08', status: 'Pending', tutorId: 102 },
    { name: 'Maria Garcia', subjectExpertise: 'English, Literature', submittedOn: '2024-03-05', status: 'Pending', tutorId: 103 },
    { name: 'David Lee', subjectExpertise: 'Computer Science, Programming', submittedOn: '2024-03-01', status: 'Re-submission Required', tutorId: 104 },
  ];

  constructor() { }

  ngOnInit(): void { }


  private route = inject(Router)

  public reviewDocuments(tutorId: number): void {
    console.log(`Navigating to document review for Tutor ID: ${tutorId}`);
    this.route.navigate(['/admin/validation'])

    // Ici, vous naviguez vers une page détaillée ou ouvrez une modale pour vérifier les documents (comme image_8c4102.png).
  }

  public getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Re-submission Required':
        return 'bg-danger';
      case 'Reviewed':
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }

  public backToAdminDashboard(): void {
    console.log('Navigating back to Admin Dashboard...');
  }

}
