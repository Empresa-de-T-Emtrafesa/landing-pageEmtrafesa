import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { PromotionsComponent } from '../../../shared/components/promotions/promotions.component';
import { ClientLandingPageComponent } from "../../client/client-landing-page/client-landing-page.component";
import { DireccionComponent } from "../../../shared/components/direccion/direccion.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    DireccionComponent,
    FooterComponent,
    PromotionsComponent,
    ClientLandingPageComponent,
    RouterOutlet,
    DireccionComponent
],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  constructor(private router: Router) {}

  onSearch(criteria: any): void {
    this.router.navigate(['/client/itinerarios'], { queryParams: criteria });
  }
}
