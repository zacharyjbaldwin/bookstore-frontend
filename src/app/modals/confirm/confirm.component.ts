import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public message: string = 'Are you sure?';

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
