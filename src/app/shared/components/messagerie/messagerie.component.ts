import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

export interface Notification {
  id: string;
  type: 'action' | 'event' | 'info' | 'alert';
  message: string;
  timestamp: Date;
  isRead: boolean;
  link?: string; // Lien vers la page concernée (ex: /tutor/sessions)
}

@Component({
  selector: 'app-messagerie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messagerie.component.html',
  styleUrl: './messagerie.component.css'
})
export class MessagerieComponent implements OnInit {
  // Notifications simulées (exemple inchangé)
  public notifications: Notification[] = [
    { id: 'N001', type: 'action', message: 'Session prévue le 2025-11-05 à 16:30 avec Charles Léger.', timestamp: new Date('2025-11-03T10:00:00'), isRead: false, link: '/tutor/sessions' },
    { id: 'N002', type: 'event', message: 'Votre paiement de 380$ a été transféré vers votre compte bancaire.', timestamp: new Date('2025-11-02T15:45:00'), isRead: false, link: '/tutor/earnings' },
    { id: 'N003', type: 'alert', message: 'Attention: Le document de validation "casier judiciaire" est expiré.', timestamp: new Date('2025-11-01T08:20:00'), isRead: true, link: '/tutor/documents' },
    { id: 'N004', type: 'info', message: 'Mise à jour de la politique de confidentialité. Veuillez consulter les changements.', timestamp: new Date('2025-10-25T11:00:00'), isRead: true, link: '/terms' },
  ];
  
  public unreadCount: number = 0;

  ngOnInit(): void {
    this.updateUnreadCount();
  }

  private updateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.isRead).length;
  }

  public markAllAsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
    this.updateUnreadCount();
    console.log("Toutes les notifications ont été marquées comme lues.");
  }

  public goToNotificationLink(notification: Notification): void {
    if (!notification.isRead) {
      notification.isRead = true;
      this.updateUnreadCount();
    }
    
    if (notification.link) {
      alert(`Navigation vers : ${notification.link}`);
    }
  }

  /**
   * [NOUVELLE MÉTHODE] Supprime une notification de la liste.
   * @param notificationId L'ID de la notification à supprimer.
   */
  public deleteNotification(notificationId: string): void {
    if (confirm("Voulez-vous vraiment supprimer cette notification ?")) {
      // Filtrer la liste pour retirer l'élément
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
      
      // Mettre à jour le compteur
      this.updateUnreadCount();
      
      // En production: Appel API pour supprimer la notification du serveur
      console.log(`Notification ${notificationId} supprimée.`);
    }
  }

  public getTypeClass(type: string): string {
    switch (type) {
      case 'action': return 'border-start border-3 border-primary';
      case 'event': return 'border-start border-3 border-success';
      case 'alert': return 'border-start border-3 border-danger';
      case 'info': default: return 'border-start border-3 border-secondary';
    }
  }
}
