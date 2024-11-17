import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { IconModule } from '@coreui/icons-angular';
import flatpickr from 'flatpickr';
import { ViajeComponent } from '../viaje/viaje.component';
import { AsientosComponent } from '../asientos/asientos.component';
import { PasajeroComponent } from '../pasajero/pasajero.component';
import { PasajeroService } from '../../../core/services/pasajero.service';

@Component({
  selector: 'app-client-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    IconModule, ViajeComponent, AsientosComponent, PasajeroComponent
  ],
  templateUrl: './client-landing-page.component.html',
  styleUrls: ['./client-landing-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientLandingPageComponent {
  @ViewChild(PasajeroComponent) pasajeroComponent!: PasajeroComponent; // Referencia al componente hijo
  formValid: boolean = false; // Para habilitar/deshabilitar el botón
  private pasajeroService = inject(PasajeroService); // Servicio de pasajero
  private _formBuilder = inject(FormBuilder);

  itinerarioSeleccionado: any = null; // Guardar el itinerario seleccionado
  asientoSeleccionado: number | null = null;
  mostrarSeleccionAsientos = false; // Controlar la vista de selección de asientos

  firstFormGroup: FormGroup = this._formBuilder.group({
    origen: ['', Validators.required],
    destino: ['', Validators.required],
    fechaIda: [null, Validators.required],
  });

  origenes = ['Trujillo', 'Cajamarca', 'Lima'];
  destinos = ['Tumbes', 'Cuzco', 'Arequipa'];
  currentStep: number = 1;

  itinerarios = [
    {
      horaSalida: '10:00 PM',
      horaLlegada: '04:30 AM',
      servicio: 'C - Fenix',
      tipo: 'Escalas',
      asientosLibres: 15,
      precioNivel1: 55,
      precioNivel2: 45
    }
  ];
  actualizarAsientoSeleccionado(asiento: number) {
    this.asientoSeleccionado = asiento;
    const nivel = asiento <= 20 ? 1 : 2;
    const precio = nivel === 1 ? this.itinerarioSeleccionado.precioNivel1 : this.itinerarioSeleccionado.precioNivel2;

    this.itinerarioSeleccionado = {
      ...this.itinerarioSeleccionado,
      asientoSeleccionado: asiento,
      precioTotal: precio,
    };
  }
  
  seleccionarAsiento(asiento: number, estado: string) {
    if (estado === 'libre') {
      this.asientoSeleccionado = asiento;
      // Calcula el precio según el nivel del asiento
      const nivel = asiento <= 20 ? 1 : 2; // Ejemplo: 1° Piso es 1-20
      const precio = nivel === 1 ? this.itinerarioSeleccionado.precioNivel1 : this.itinerarioSeleccionado.precioNivel2;

      // Actualiza la información del viaje
      this.itinerarioSeleccionado = {
        ...this.itinerarioSeleccionado,
        asientoSeleccionado: asiento,
        precioTotal: precio,
      };
    } else {
      alert('Este asiento no está disponible.');
    }
  }

  @ViewChild('fechaIdaInput') fechaIdaInput!: ElementRef;

  constructor() {}

  registrarPasajero(): void {
    // Llama al método de registro del componente hijo (PasajeroComponent)
    if (this.formValid) {
      this.pasajeroComponent.onSubmit();
      this.setStep(4); // Avanza al paso 4 (pago)
    } else {
      alert('Complete todos los campos correctamente antes de continuar.');
    }
  }

  onSeleccionarItinerario(itinerario: any) {
    this.itinerarioSeleccionado = itinerario;
    this.mostrarSeleccionAsientos = true;
  }

  ngAfterViewInit(): void {
    // Inicializar flatpickr en el campo de fecha
    flatpickr(this.fechaIdaInput.nativeElement, {
      dateFormat: 'd/m/Y',
      minDate: 'today',
      disableMobile: true,
    });
  }

  secondFormGroup: FormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup: FormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  setStep(step: number) {
    this.currentStep = step;
    console.log("Paso actual:", this.currentStep);
  }
  
}
/*
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-landing-page',
  imports:[
    CommonModule,
    RouterOutlet

  ],
  templateUrl: './client-landing-page.component.html',
  styleUrls: ['./client-landing-page.component.css'],
  standalone: true
})
export class ClientLandingPageComponent {
  @Output() search = new EventEmitter<any>();

  tripType: string = 'round-trip';
  origen: string = '';
  destino: string = '';
  fecha: string = '';
  passengers: number = 1;

  onSearch(): void {
    const searchCriteria = {
      tripType: this.tripType,
      origen: this.origen,
      destino: this.destino,
      fecha: this.fecha,
      passengers: this.passengers,
    };
    this.search.emit(searchCriteria);
  }
}*/
