import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-asientos',
  standalone: true,
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent {
  @Input() itinerario: any; // Recibir el itinerario seleccionado
  @Input() asientoSeleccionado: number | null = null; // Asiento seleccionado actual
  @Output() asientoSeleccionadoEvent = new EventEmitter<number>(); // Emitir el asiento seleccionado
  @Output() avanzarPasoEvent = new EventEmitter<void>(); // Emitir evento para avanzar al siguiente paso


  seleccionarAsiento(asiento: number, estado: string) {
    if (estado === 'libre') {
      this.asientoSeleccionadoEvent.emit(asiento); // Emitir el evento de selección de asiento
    } else {
      alert('Este asiento no está disponible.');
    }
  }

  // Método para emitir el evento de avanzar paso
  avanzarPaso() {
    this.avanzarPasoEvent.emit();
  }
}
