import { Component, ElementRef, ViewChild, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import flatpickr from 'flatpickr';
import { PasajeroService } from '../../../core/services/pasajero.service'; // Servicio para registrar pasajero
import { PasajeroRequest } from '../../../shared/models/pasajero-request';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
})
export class PasajeroComponent {
  @Output() formValidity = new EventEmitter<boolean>();

  private pasajeroService = inject(PasajeroService); // Inyectamos el servicio
  private fb = inject(FormBuilder);

  pasajeroForm: FormGroup;
  registroExitoso: boolean = false; // Bandera para mostrar éxito o error

  @ViewChild('fechaNacimientoInput') fechaNacimientoInput!: ElementRef;

  constructor() {
    this.pasajeroForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidos: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });

    this.pasajeroForm.statusChanges.subscribe(() => {
      this.formValidity.emit(this.pasajeroForm.valid);
    });
  }

  ngAfterViewInit(): void {
    flatpickr(this.fechaNacimientoInput.nativeElement, {
      dateFormat: 'Y-m-d', // Formato compatible con el backend (ISO)
      maxDate: 'today', // Solo fechas en el pasado
      disableMobile: true,
      onChange: (selectedDates, dateStr) => {
        this.pasajeroForm.get('fechaNacimiento')?.setValue(dateStr);
      },
    });
  }

  onSubmit() {
    if (this.pasajeroForm.valid) {
      const pasajeroRequest: PasajeroRequest = this.pasajeroForm.value;

      this.pasajeroService.pasajero(pasajeroRequest).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.registroExitoso = true;
          alert('Pasajero registrado con éxito');
        },
        error: (error) => {
          console.error('Error al registrar pasajero:', error);
          alert('Error al registrar pasajero.');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
