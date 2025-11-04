import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export type DocStatus = 'approved' | 'pending' | 'required' | 'uploaded';

export interface RequiredDocument {
  id: number;
  title: string;
  description: string;
  isRequired: boolean;
  currentFile?: {
    name: string;
    status: DocStatus;
    uploadedOn?: string;
  };
}

export interface UploadedDocument {
  id: number;
  fileName: string;
  uploadedOn: string;
  status: DocStatus;
}

@Component({
  selector: 'app-tutor-documents',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './tutor-documents.component.html',
  styleUrl: './tutor-documents.component.css'
})
export class TutorDocumentsComponent implements OnInit {
  
  private router = inject(Router)

  // Données de mock pour la table
  uploadedDocuments: Document[] = [
    { name: 'Teaching License.pdf', type: 'Certification', date: '2023-01-15', status: 'Approved' },
    { name: 'Degree Certificate.jpg', type: 'Academic', date: '2023-02-01', status: 'Pending' },
    { name: 'Background Check.pdf', type: 'Verification', date: '2023-03-10', status: 'Approved' },
    { name: 'Resume.docx', type: 'Professional', date: '2023-03-22', status: 'Pending' },
    { name: 'Identity Proof.png', type: 'Verification', date: '2023-04-05', status: 'Rejected' },
    { name: 'Tutor Agreement.pdf', type: 'Contract', date: '2023-04-10', status: 'Approved' },
  ];

  maxFileSizeMB = 10;
  
  constructor() { }

  ngOnInit(): void {
    // Logique d'initialisation (ex: charger les documents depuis l'API)
  }

  onUploadClick() {
    alert('Logique de téléchargement...');
    // Ici, vous appelleriez le service pour ouvrir la fenêtre de dialogue ou traiter le drag-and-drop
  }

  onView(doc: Document) {
    console.log('Afficher le document:', doc.name);
  }

  onDelete(doc: Document) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${doc.name}?`)) {
      console.log('Supprimer le document:', doc.name);
      // Logique de suppression via un service
    }
  }

  // Helper pour obtenir la classe Bootstrap en fonction du statut
  getStatusClass(status: DocumentStatus): string {
    switch (status) {
      case 'Approved':
        return 'bg-success';
      case 'Pending':
        return 'bg-warning';
      case 'Rejected':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  // Simule le retour au tableau de bord
  public backToDashboard(): void {
    console.log('Naviguer vers /dashboard');
    this.router.navigate(['tutor/dashboard']);
  }


}

  // ⚠️ Créez ce petit fichier de modèle pour la sécurité de type !
  // document.model.ts
  export type DocumentStatus = 'Approved' | 'Pending' | 'Rejected';

  export interface Document {
    name: string;
    type: string;
    date: string; // Utiliser Date ou string selon vos besoins
    status: DocumentStatus;
  }

