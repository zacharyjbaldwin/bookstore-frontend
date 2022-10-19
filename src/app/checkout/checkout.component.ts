import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AddAddressModalComponent } from '../modals/add-address-modal/add-address-modal.component';
import { Address } from '../models/address.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public addresses: Address[] = [];
  public currentPage: String = 'shipping';
  public deliveryStandard: Date;
  public selectedShippingSpeed: boolean = false;
  public selectedAddress: boolean = false;
  public paymentForm: FormGroup;
  public addAddressModal?: BsModalRef;
  public showPlaceOrderButton: boolean = true;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
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

    this.fetchAddresses();
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
    this.currentPage = 'review';
  }

  // openAddAddressModal() {
  //   this.addAddressModal = this.modalService.show(AddAddressModalComponent, { class: 'modal-md' });
  //   (this.addAddressModal.content as AddAddressModalComponent).affirm.subscribe((address: Address) => {
  //   });
  // }

  openAddAddressModal() {
    this.addAddressModal = this.modalService.show(AddAddressModalComponent, { class: 'modal-md' });
    (this.addAddressModal.content as AddAddressModalComponent).affirm.subscribe((res: Address) => {
      const address: Address = {
        sendTo: res.sendTo,
        addrLine1: res.addrLine1,
        addrLine2: (res.addrLine2 ? res.addrLine2 : undefined),
        city: res.city,
        state: res.state,
        zip: res.zip
      };

      this.addAddress(address);
    });
  }

  addAddress(address: Address) {
    this.userService.addAddress(address).subscribe((res) => {
      this.toastr.success('Added address.');
      this.fetchAddresses();
    });
  }

  private fetchAddresses() {
    // this.loading = true;

    this.userService.getAddressesById(this.authService.getUserId()).subscribe((addresses: Address[]) => {
      this.addresses = addresses;
      // this.count = this.addresses.length;
      // this.loading = false;
    });
  }
}
