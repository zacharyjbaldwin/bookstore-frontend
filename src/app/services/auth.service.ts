import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginError } from '../shared/login-error.enum';
import { SignupError } from '../shared/signup-error.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;
  private logoutTimer: any;
  private token: string = '';
  private userId: string = '';
  private firstname: string = '';
  private lastname: string = '';

  public loginError = new Subject<LoginError>();
  public signupError = new Subject<SignupError>();

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

  public getIsAdmin(): boolean {
    return this.isAdmin;
  }

  public getToken(): string {
    return this.token;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getFirstName(): string {
    return this.firstname;
  }

  public getLastName(): string {
    return this.lastname;
  }

  public login(email: string, password: string, redirectTo?: string): void {
    const body = {
      email: email,
      password: password
    };

    this.http.post<{ token: string, expiresIn: number, userId: string, firstname: string, lastname: string, isAdmin: boolean }>(`${environment.apiUrl}/api/auth/login`, body)
      .subscribe({
        next: (response) => {
          this.token = response.token;
          if (this.token) {

            const expiresInSeconds = response.expiresIn;
            this.firstname = response.firstname;
            this.lastname = response.lastname;

            this.setAutoLogoutTimer(expiresInSeconds);


            this.isAuthenticated = true;
            this.userId = response.userId;
            this.isAdmin = response.isAdmin;
            this.authenticationStatusListener.next(true);

            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInSeconds * 1000);

            this.saveAuthData(this.token, expirationDate, this.userId, this.firstname, this.lastname, this.isAdmin);

            if (redirectTo) {
              this.router.navigate([`/${redirectTo}`]);
            } else {
              this.router.navigate(['/']);
            }
          }
        },
        error: (error) => {
          switch (error.error.error) {
            case 'EMAIL_DOES_NOT_EXIST': // Email does not exist.
              this.loginError.next(LoginError.EmailDoesNotExist);
              break;
            case 'INCORRECT_PASSWORD': //
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
    this.token = '';
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authenticationStatusListener.next(false);
    this.userId = '';

    clearInterval(this.logoutTimer);

    this.clearAuthData();
    this.router.navigate(['/']);
  }

  public autoLogin(): void {
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
      this.firstname = authData.firstname;
      this.lastname = authData.lastname;
      this.isAdmin = authData.isAdmin;
      this.authenticationStatusListener.next(true);
      this.setAutoLogoutTimer(expiresIn / 1000);
    }
  }

  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const isAdmin = localStorage.getItem('isAdmin') == 'true' ? true : false;

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      firstname: firstname,
      lastname: lastname,
      isAdmin: isAdmin
    }
  }

  private setAutoLogoutTimer(seconds: number): void {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, seconds * 1000);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('isAdmin');
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, firstname: string, lastname: string, isAdmin: boolean): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('isAdmin', (isAdmin == true ? 'true' : 'false'));
  }

  public signUp(email: string, firstname: string, lastname: string, password: string): void {
    const body = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
    };

    this.http.post(`${environment.apiUrl}/api/auth/signup`, body)
      .subscribe({
        next: (response) => {
          console.log(response);


          // TODO tie this up
          this.router.navigate(['/login']);
        },
        error: (error) => {
          // this.isLoading = false;

          switch (error.error.error) {
            case 'EMAIL_ALREADY_IN_USE':
              this.signupError.next(SignupError.EmailAlreadyInUse);
              break;
            default:
              this.signupError.next(SignupError.GenericSignupError);
              break;
          }

          this.authenticationStatusListener.next(false);
        }
      });
  }
}
