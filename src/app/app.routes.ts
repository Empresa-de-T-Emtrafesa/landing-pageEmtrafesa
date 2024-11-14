import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'client', pathMatch: 'full'
    },
    {
        path: 'client',
        loadChildren: () => import('./page/client/client.routes').then(c => c.clientRoutes)
    },
    {
        path: 'auth',
        loadChildren: () => import('./page/auth/auth.routes').then(a => a.authRoutes)
    }
];
