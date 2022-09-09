import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FirstVisitModalComponent } from './modals/first-visit-modal/first-visit-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public firstVisitModal?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {

    // setTimeout(() => {
    //   if (localStorage.getItem('sawMessage') != 'true') {
    //     this.firstVisitModal = this.modalService.show(FirstVisitModalComponent);
    //     localStorage.setItem('sawMessage', 'true');
    //   }
    // }, 1500);

  }

}
