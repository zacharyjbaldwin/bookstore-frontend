import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  @Output() public loggedIn = new EventEmitter();

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.modalRef.hide();
  }

}
