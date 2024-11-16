import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PasajeroRequest } from "../../shared/models/pasajero-request";
import { Observable } from "rxjs";
import { PasajeroResponse } from "../../shared/models/pasajero-response";

@Injectable({
    providedIn: 'root'
})
export class PasajeroService{
    private baseUrl = `${environment.baseUrl}/register/pasajero`;
    constructor(private http: HttpClient) {}


    pasajero (pasajeroRequest: PasajeroRequest): Observable<PasajeroResponse>{
        return this.http.post<PasajeroResponse>(this.baseUrl, pasajeroRequest);
    }
}