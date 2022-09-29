import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';

  constructor(private authService: AuthService) {
    this.firstname = authService.getFirstName().toUpperCase();
    this.lastname = authService.getLastName().toUpperCase();
    this.email = authService.getEmail().toUpperCase();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  editName() {
    alert('501 not implemented');
  }

  editEmail() {
    alert('501 not implemented');
  }

  editPassword() {
    alert('501 not implemented');
  }

}
