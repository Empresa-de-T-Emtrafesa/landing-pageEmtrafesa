import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}
  logout() {
    // Aquí puedes agregar lógica adicional para cerrar la sesión, como eliminar el token de autenticación
    console.log('Cerrando sesión...');
    
    // Redirige a la página principal
    this.router.navigate(['/auth/login']);
  }
}