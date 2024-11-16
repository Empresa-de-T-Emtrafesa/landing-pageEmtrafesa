import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.component.html',
  styleUrls: ['./pasajero.component.css'],
  standalone: true,
  imports: [MatFormField, MatLabel, MatCommonModule, ReactiveFormsModule],
})
export class PasajeroComponent {
  pasajeroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pasajeroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.pasajeroForm.valid) {
      console.log(this.pasajeroForm.value);
      // Aquí puedes manejar los datos del formulario
    } else {
      console.log('Formulario inválido');
    }
  }
}
