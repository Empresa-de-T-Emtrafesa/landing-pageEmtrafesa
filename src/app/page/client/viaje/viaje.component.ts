import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';

interface Viaje {
  horaSalida: string;
  horaLlegada: string;
  servicio: string;
  tipo: string;
  asientosLibres: number;
  precioNivel1: number;
  precioNivel2: number;
}

@Component({
  selector: 'app-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent {
  @Input() viajes: Viaje[] = [];
  @Output() seleccionarItinerario = new EventEmitter<Viaje>();

  onElegir(viaje: Viaje) {
    this.seleccionarItinerario.emit(viaje); // Emitir el itinerario seleccionado
  }
}
