import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-landing-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterOutlet, RouterLink],
  templateUrl: './client-landing-page.component.html',
  styleUrls: ['./client-landing-page.component.css']
})
export class ClientLandingPageComponent {

}
