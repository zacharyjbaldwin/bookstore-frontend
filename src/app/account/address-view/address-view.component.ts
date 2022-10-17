import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddAddressModalComponent } from 'src/app/modals/add-address-modal/add-address-modal.component';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.scss']
})
export class AddressViewComponent implements OnInit {

  private addAddressModal?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openAddAddressModal() {
    this.addAddressModal = this.modalService.show(AddAddressModalComponent, { class: 'modal-md' });
    (this.addAddressModal.content as AddAddressModalComponent).affirm.subscribe((address: Address) => {
      console.log(address);
    });
  }

}
