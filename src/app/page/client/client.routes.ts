import { Routes } from '@angular/router';
import { CompraComponent } from './compra/compra.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';
import { ClientLandingPageComponent } from './client-landing-page/client-landing-page.component';


export const clientRoutes: Routes = [
    {
        path: '',
        component: ClientLandingPageComponent,
        children: [
            { path: '', redirectTo: 'compra', pathMatch: 'full' },
            { path: 'compra', component: CompraComponent },
            { path: 'profile', component: UserProfileComponent },
            { path: 'profile/update', component: UpdateProfileComponent },
        ]
    }
];