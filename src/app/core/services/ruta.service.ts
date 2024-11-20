// src/app/core/services/ruta.service.ts

import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RutaService {
    private baseUrl = `${environment.baseUrl}/rutas`;
    private http = inject(HttpClient);

    constructor() {}

    /**
     * Obtiene todos los orígenes únicos.
     */
    getOrigenes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/origenes`);
    }

    /**
     * Obtiene todos los destinos únicos.
     */
    getDestinos(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/destinos`);
    }

    /**
     * Obtiene destinos filtrados por un origen específico.
     */
    getDestinosPorOrigen(origen: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/destinos/${origen}`);
    }
}
