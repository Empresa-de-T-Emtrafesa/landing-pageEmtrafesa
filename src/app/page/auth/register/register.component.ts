import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from '../../../core/services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private registerService = inject(RegisterService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Siempre valida números
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      tipoTelefono: ['', Validators.required],
      numeroTelefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Solo números
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm.get('tipoDocumento')?.valueChanges.subscribe((tipoDocumento) => {
      this.validacionesNumeroDocumento(tipoDocumento);
    });

    this.registerForm.get('tipoTelefono')?.valueChanges.subscribe((tipoTelefono) => {
      this.validacionesNumeroTelefono(tipoTelefono);
    });
  }

  validacionesNumeroTelefono(tipoTelefono: string) {
    const numeroTelefonoControl = this.registerForm.get('numeroTelefono');

    if (tipoTelefono == '1') {
      numeroTelefonoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]);
    } else if (tipoTelefono === '2') {
      numeroTelefonoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(6),
        Validators.maxLength(6)
      ]);
    } else if (tipoTelefono === '3') {
      numeroTelefonoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]);
    } else {
      numeroTelefonoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]);
    }
    numeroTelefonoControl?.updateValueAndValidity();
  }

  maxDocumentoLength() {
    const tipoTelefono = this.registerForm.get('tipoTelefono')?.value;
    const numeroTelefonoControl = this.registerForm.get('numeroTelefono');
    const maxLength = tipoTelefono === '1' || tipoTelefono === '3' ? 9 : tipoTelefono === '2' ? 6 : undefined;

    if (maxLength && numeroTelefonoControl && numeroTelefonoControl.value.length > maxLength) {
      numeroTelefonoControl.setValue(numeroTelefonoControl.value.slice(0, maxLength));
    }
  }


  validacionesNumeroDocumento(tipoDocumento: string) {
    const numeroDocumentoControl = this.registerForm.get('numeroDocumento');

    if (tipoDocumento === '1') {
      numeroDocumentoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]);
    } else if (tipoDocumento === '2') {
      numeroDocumentoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(20)
      ]);
    } else {
      numeroDocumentoControl?.setValidators([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]);
    }
    numeroDocumentoControl?.updateValueAndValidity();
  }


  enforceMaxLength() {
    const tipoDocumento = this.registerForm.get('tipoDocumento')?.value;
    const numeroDocumentoControl = this.registerForm.get('numeroDocumento');
    const maxLength = tipoDocumento === '1' ? 8 : tipoDocumento === '2' ? 20 : undefined;

    if (maxLength && numeroDocumentoControl && numeroDocumentoControl.value.length > maxLength) {
      numeroDocumentoControl.setValue(numeroDocumentoControl.value.slice(0, maxLength));
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      if (userData.tipoDocumento === '1') {
        userData.tipoDocumento = 'DNI';
      } else if (userData.tipoDocumento === '2') {
        userData.tipoDocumento = 'CARNET_DE_EXTRANJERIA';
      }

      // Mapea tipoTelefono a los valores correctos
      if (userData.tipoTelefono === '1') {
        userData.tipoTelefono = 'CELULAR';
      } else if (userData.tipoTelefono === '2') {
        userData.tipoTelefono = 'FIJO';
      } else if (userData.tipoTelefono === '3') {
        userData.tipoTelefono = 'TRABAJO';
      }

      this.registerService.register(userData).subscribe({
        next: () => {
          this.showSnackBar('Usuario creado correctamente.');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.showSnackBar('');
        }
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}

