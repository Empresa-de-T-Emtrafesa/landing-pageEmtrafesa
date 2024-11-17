import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './page/auth/auth-layout/auth-layout.component';
import { ClientLandingPageComponent } from './page/client/client-landing-page/client-landing-page.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent
    },
    {
        path: '',
        component: ClientLandingPageComponent
    },
    {
        path: 'client',
        loadChildren: () => import('./page/client/client.routes').then(c => c.clientRoutes)
    },
    {
        path: 'auth',
        loadChildren: () => import('./page/auth/auth.routes').then(a => a.authRoutes)
    },
    {
        path: '**',
        redirectTo: ''
      }
];
