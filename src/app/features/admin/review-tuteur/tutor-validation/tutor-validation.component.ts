import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface DocumentForReview {
    name: string;
    fileName: string;
}

export interface UserReviewDetails {
    name: string;
    email: string;
    subjects: string;
    phone: string;
    experience: string;
    documents: DocumentForReview[];
}

@Component({
  selector: 'app-tutor-validation',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './tutor-validation.component.html',
  styleUrl: './tutor-validation.component.css'
})
export class TutorValidationComponent implements OnInit {
  // Simule les données du tuteur en cours de révision
  public tutorDetails: UserReviewDetails = {
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    subjects: 'Mathematics, Physics',
    phone: '+1 (555) 123-4567',
    experience: '5 years experience in high school tutoring.',
    documents: [
      { name: 'Degree Certificate - Math.pdf', fileName: 'degree_math.pdf' },
      { name: 'Teaching License - State A.pdf', fileName: 'license_state_a.pdf' },
      { name: 'ID Proof - Passport.pdf', fileName: 'id_passport.pdf' }
    ]
  };
  
  // ID du tuteur en cours de révision (obtenu via le routing)
  public tutorId: number = 101; 

  constructor() { }

  ngOnInit(): void {
    // Dans une application réelle, utiliser this.tutorId pour charger les données de l'API.
  }

  private route = inject(Router)

  public backToQueue(): void {
    console.log('Navigating back to Tutor Validation Queue...');
    this.route.navigate(['/admin/tutors'])
  }

  public downloadDocument(fileName: string): void {
    console.log(`Downloading file: ${fileName}`);
    // Logique de téléchargement réel
  }

  public approveTutor(): void {
    console.log(`Approving Tutor ID: ${this.tutorId}`);
    alert(`Tutor ${this.tutorDetails.name} approved!`);
  }

  public rejectTutor(): void {
    console.log(`Rejecting Tutor ID: ${this.tutorId}`);
    alert(`Tutor ${this.tutorDetails.name} rejected.`);
  }

  public requestMoreInfo(): void {
    const reason = prompt('Please enter the reason for requesting more information:');
    if (reason) {
      console.log(`Requesting more info for Tutor ID: ${this.tutorId}. Reason: ${reason}`);
      alert(`Request for more info sent to ${this.tutorDetails.name}.`);
    }
  }

}
