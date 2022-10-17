import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddAddressModalComponent } from '../modals/add-address-modal/add-address-modal.component';
import { Address } from '../models/address.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public currentPage: String = 'shipping';
  public deliveryStandard: Date;
  public selectedShippingSpeed: boolean = false;
  public selectedAddress: boolean = false;
  public paymentForm: FormGroup;
  public addAddressModal?: BsModalRef;
  // public addresses: {_id: string, address: Address}[] = [];

  constructor(private modalService: BsModalService) {
    this.deliveryStandard = new Date();
    this.deliveryStandard.setDate(this.deliveryStandard.getDate() + 3);
    this.paymentForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      cardType: new FormControl('visa', [Validators.required]),
      cardNumber: new FormControl(null, [Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)]),
      cvv: new FormControl(null, [Validators.required, Validators.min(100), Validators.max(999)]),
      expireMonth: new FormControl('january', [Validators.required]),
      expireYear: new FormControl(2022, [Validators.required, Validators.min(1000), Validators.max(9999)])
    });
  }

  ngOnInit(): void {
  }

  changePage(page: String) {
    this.currentPage = page;
  }

  selectedInput() {
    this.selectedShippingSpeed = true;
  }

  goToReview() {
    console.log(this.paymentForm.value);
    this.currentPage = 'review';
  }

  openAddAddressModal() {
    this.addAddressModal = this.modalService.show(AddAddressModalComponent, { class: 'modal-md' });
    (this.addAddressModal.content as AddAddressModalComponent).affirm.subscribe((address: Address) => {
      console.log(address);
    });
  }
}
