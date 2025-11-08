import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { userGuard } from './core/guards/user.guard';


export const routes: Routes = [

   // ----------------------------------------------------------------------
    // 1. ROUTES PUBLIQUES (Authentification)
    // ----------------------------------------------------------------------
    { 
        path: '', 
        loadComponent: () => import('./features/auth/home-page/home-page.component').then(m => m.HomePageComponent),
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    { 
        path: 'register', 
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },
    { 
        path: 'forgotpassword', 
        loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    { 
        path: 'view-profile'/*/:id*/, // Utilisez une route paramétrée pour un profil public
        loadComponent: () => import('./features/tutor/tutor-profile/tutor-profile.component').then(m => m.TutorProfileComponent),
    },


    // ----------------------------------------------------------------------
    // 2. ROUTES ÉTUDIANT (Utilisation du StudentShellComponent)
    // ----------------------------------------------------------------------
    {
        path: 'student',
        loadComponent: () => import('./features/student/student-shell/student-shell.component').then(m => m.StudentShellComponent),
        // canActivate: [authGuard, studentGuard], // PROTECTION UNIQUE pour toutes les routes enfants
        // PROTECTION DU SHELL : Doit être connecté ET avoir le rôle ETUDIANT
        canActivate: [authGuard, roleGuard], 
        data: { roles: ['ETUDIANT'] }, // Rôle requis pour le RoleGuard
        children: [
            { 
                path: '', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
            { 
                path: 'dashboard', 
                loadComponent: () => import('./features/student/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
            },
            { 
                path: 'search', 
                loadComponent: () => import('./features/student/student-search/student-search.component').then(m => m.StudentSearchComponent),
            },
            { 
                path: 'session', 
                loadComponent: () => import('./features/student/student-session/student-session.component').then(m => m.StudentSessionComponent),
            },
            { 
                path: 'recharge', 
                loadComponent: () => import('./features/student/student-recharge/student-recharge.component').then(m => m.StudentRechargeComponent),
            },
            { 
                path: 'profile', 
                // Utilisation du composant de gestion de profil étudiant que nous avons créé
                loadComponent: () => import('./features/student/student-profile/student-profile.component').then(m => m.StudentProfileComponent),
            },
            { 
                path: 'messages'/*/:id*/, // Utilisez une route paramétrée pour un profil public
                loadComponent: () => import('./shared/components/messagerie/messagerie.component').then(m => m.MessagerieComponent),
            }
        ]
    },
    
    // ----------------------------------------------------------------------
    // 3. ROUTES TUTEUR (Utilisation du TutorShellComponent)
    // ----------------------------------------------------------------------
    {
        path: 'tutor',
        loadComponent: () => import('./features/tutor/tutor-shell/tutor-shell.component').then(m => m.TutorShellComponent),
        // canActivate: [authGuard, tutorGuard], // PROTECTION UNIQUE
        // 🎯 PROTECTION DU SHELL : Doit être connecté ET avoir le rôle TUTEUR
        canActivate: [authGuard, roleGuard], 
        data: { roles: ['TUTEUR'] }, // Rôle requis pour le RoleGuard
        children: [
            { 
                path: '', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
            { 
                path: 'dashboard', 
                loadComponent: () => import('./features/tutor/tutor-dashboard/tutor-dashboard.component').then(m => m.TutorDashboardComponent),
            },
            { 
                path: 'schedule', 
                loadComponent: () => import('./features/tutor/tutor-schedule/tutor-schedule.component').then(m => m.TutorScheduleComponent),
            },
            { 
                path: 'documents', 
                loadComponent: () => import('./features/tutor/tutor-documents/tutor-documents.component').then(m => m.TutorDocumentsComponent),
            },
            { 
                path: 'settings', 
                // Utilisation du composant de gestion de profil tuteur que nous avons créé
                loadComponent: () => import('./features/tutor/tutor-settings/tutor-settings.component').then(m => m.TutorSettingsComponent),
            },
            // Route pour afficher son profil public (peut ne pas nécessiter d'être dans le shell si c'est une vue publique)
            { 
                path: 'students'/*/:id*/, // Utilisez une route paramétrée pour un profil public
                loadComponent: () => import('./features/tutor/tutor-students/tutor-students.component').then(m => m.TutorStudentsComponent),
            },
            { 
                path: 'earnings'/*/:id*/, // Utilisez une route paramétrée pour un profil public
                loadComponent: () => import('./features/tutor/tutor-earnings/tutor-earnings.component').then(m => m.TutorEarningsComponent),
            },
            { 
                path: 'messages'/*/:id*/, // Utilisez une route paramétrée pour un profil public
                loadComponent: () => import('./shared/components/messagerie/messagerie.component').then(m => m.MessagerieComponent),
            }
        ]
    },

    // ----------------------------------------------------------------------
    // 4. ROUTES ADMIN (Utilisation du AdminShellComponent)
    // ----------------------------------------------------------------------
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin-shell/admin-shell.component').then(m => m.AdminShellComponent),
        // canActivate: [authGuard, adminGuard], // PROTECTION UNIQUE
        // PROTECTION DU SHELL : Doit être connecté ET avoir le rôle ADMIN
        canActivate: [authGuard, roleGuard], 
        data: { roles: ['ADMIN'] }, // Rôle requis pour le RoleGuard
        children: [
            { 
                path: '', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
            { 
                path: 'dashboard', 
                loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
            },
            // Harmonisation des routes de validation (Validation Queue)
            { 
                path: 'tutors', 
                loadComponent: () => import('./features/admin/review-tuteur/review-tuteur.component').then(m => m.ReviewTuteurComponent),
            },
            // Route détaillée pour la révision d'un tuteur
            {
                path: 'validation',
                loadComponent: () => import('./features/admin/review-tuteur/tutor-validation/tutor-validation.component').then(m => m.TutorValidationComponent),
            },
            { 
                path: 'transactions', 
                loadComponent: () => import('./features/admin/viewtransactions/viewtransactions.component').then(m => m.ViewtransactionsComponent),
            },
            { 
                path: 'users', 
                loadComponent: () => import('./features/admin/manage-users/manage-users.component').then(m => m.ManageUsersComponent),
            },
            { 
                path: 'subjects-levels', // Nom plus clair
                loadComponent: () => import('./features/admin/manage-subjects/manage-subjects.component').then(m => m.ManageSubjectsComponent),
            },
            { 
                path: 'settings',/*:id*/ 
                loadComponent: () => import('./features/admin/admin-settings/admin-settings.component').then(m => m.AdminSettingsComponent),
                canActivate: [userGuard]
            },
            { 
                path: 'messages'/*/:id*/, // Utilisez une route paramétrée pour un profil public
                loadComponent: () => import('./shared/components/messagerie/messagerie.component').then(m => m.MessagerieComponent),
            }
        ]
    },

    // ----------------------------------------------------------------------
    // 5. Pages d'Erreur (À ajouter pour une UX professionnelle)
    // ----------------------------------------------------------------------
    { 
        path: 'unauthorized', 
        loadComponent: () => import('./features/auth/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
    },

    // ----------------------------------------------------------------------
    // 6. FALLBACK / 404
    // ----------------------------------------------------------------------
    { 
        path: '**', 
        redirectTo: '' // Redirige vers la page d'accueil par défaut
        // Idéalement, charger un composant 404 ici
    },


];
