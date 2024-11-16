import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "./storage.service";
import { AuthRequest } from "../../shared/models/auth-request";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AuthResponse } from "../../shared/models/auth-response";
import { RegisterRequest } from "../../shared/models/register-request";
import { RegisterResponse } from "../../shared/models/register-response";
@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private baseUrl = `${environment.baseUrl}/auth`;
    private http = inject(HttpClient);
    private storageService = inject(StorageService);
    private loggedIn = new BehaviorSubject<boolean>(false);
    constructor() {}

    get isLoggedIn(){
        return this.loggedIn.asObservable();
    }

    login (authRequest: AuthRequest): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, authRequest).pipe(
            tap(response => {this.storageService.setAuthData(response);
            this.loggedIn.next(true);
            })
        );
    }

    logout(): void{
        this.storageService.clearAuthData();
        this.loggedIn.next(false);
    }

    isAuthenticated(): boolean{
        return this.storageService.getAuthData() !==null;
    }
}