import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { Observable, tap } from "rxjs";
import { RegisterRequest } from "../../shared/models/register-request";
import { RegisterResponse } from "../../shared/models/register-response";
@Injectable({
    providedIn: 'root'
})

export class RegisterService{
    private baseUrl = `${environment.baseUrl}/register`;
    private http = inject(HttpClient);
    private storageService = inject(StorageService);
    constructor() {}

    register (registerRequest: RegisterRequest): Observable<RegisterResponse>{
        return this.http.post<RegisterResponse>(`${this.baseUrl}`, registerRequest);
    }
}