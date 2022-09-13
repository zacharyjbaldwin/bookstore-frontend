import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private authenticationStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private logoutTimer: any;
  private token: string = "";
  private userId: string = "";
  private firstName: string = "";
  private lastName: string = "";
  // public loginError = new Subject<LoginError>();

  public getToken(): string {
    return this.token;
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public login(email: string, password: string) {
    alert('Not implemented.');
  }
}
