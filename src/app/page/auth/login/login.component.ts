import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { AuthRequest } from '../../../shared/models/auth-request';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, CommonModule, ReactiveFormsModule, RouterLink, FormsModule, MatInputModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);


  constructor() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.showSnackBar('Inicio sesión exitoso');
        this.router.navigate(['/dashboard']); // Redirige a la página deseada
      },
      error: () => {
        this.showSnackBar('Error en el inicio de sesión. Por favor intenta de nuevo.');
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}