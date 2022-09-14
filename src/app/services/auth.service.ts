import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginError } from '../shared/login-error.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private logoutTimer: any;
  private token: string = "";
  private userId: string = "";
  private firstName: string = "";
  private lastName: string = "";

  public loginError = new Subject<LoginError>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getAuthenticationStatusListener(): Subject<boolean> {
    return this.authenticationStatusListener;
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public getToken(): string {
    return this.token;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public login(email: string, password: string): void {
    const body = {
      email: email,
      password: password
    };

    this.http.post<{ token: string, expiresIn: number, userId: string, firstName: string, lastName: string }>(`${environment.apiUrl}/api/auth/login`, body)
      .subscribe({
        next: (response) => {
          this.token = response.token;

          if (this.token) {

            const expiresInSeconds = response.expiresIn;
            this.firstName = response.firstName;
            this.lastName = response.lastName;
            this.setAutoLogoutTimer(expiresInSeconds);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authenticationStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInSeconds * 1000);

            this.saveAuthData(this.token, expirationDate, this.userId, this.firstName, this.lastName);
            this.router.navigate(['/profile']);
          }
        },
        error: (error) => {
          switch (error.error.error) {
            case 'EMAIL_DOES_NOT_EXIST':
              this.loginError.next(LoginError.EmailDoesNotExist);
              break;
            case 'INCORRECT_PASSWORD':
              this.loginError.next(LoginError.IncorrectPassword);
              break;
            default:
              this.loginError.next(LoginError.GenericLoginError);
              break;
          }

        }
      });
  }

  public logout(): void {
    this.token = "";
    this.isAuthenticated = false;
    this.authenticationStatusListener.next(false);

    this.userId = "";

    clearInterval(this.logoutTimer);

    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  public autoLogin() {
    const authData = this.getAuthData();
    const now = new Date();

    if (!authData) {
      return;
    }

    const expiresIn = authData.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authData.token;
      this.isAuthenticated = true;
      this.userId = authData.userId;
      this.firstName = authData.firstName;
      this.lastName = authData.lastName;
      this.authenticationStatusListener.next(true);
      this.setAutoLogoutTimer(expiresIn / 1000);
    }
  }

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      firstName: firstName,
      lastName: lastName
    }
  }

  private setAutoLogoutTimer(seconds: number): void {
    // console.log('Setting autoLogoutTimer for ' + seconds + ' seconds.');
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, seconds * 1000);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, firstName: string, lastName: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  }

  public signUp(email: string, name: string, password: string): void {
    const body = {
      email: email,
      name: name,
      password: password
    };

    this.http.post(`${environment.apiUrl}/api/auth/signup`, body)
      .subscribe({
        next: (response) => {
          // TODO tie this up
          // this.router.navigate(['/'])
        },
        error: (error) => {
          // this.isLoading = false;
          this.authenticationStatusListener.next(false);
        }
      });
  }
}
