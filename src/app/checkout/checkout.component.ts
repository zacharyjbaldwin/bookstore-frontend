import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AddAddressModalComponent } from '../modals/add-address-modal/add-address-modal.component';
import { Address } from '../models/address.model';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { CardType } from '../shared/card-type.enum';
import { OrderStatus } from '../shared/order-status.enum';

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
  public selectAddressForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required])
  });

  public addressId: string = '';
  public cardType: CardType = CardType.VISA;
  public last4CardDigits: Number = 1234;
  public status: OrderStatus = OrderStatus.Pending;
  public shippingPrice: Number = 5;
  public subtotal: Number = 0;
  public tax: Number = 0;
  public totalPrice: Number = 0;


  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService,
    private orderService: OrderService
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
    // this.
  }

  selectAddress() {
    this.addressId = this.selectAddressForm.value.address;
    console.log(this.addressId);
    this.changePage('card');
  }

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
    this.userService.getAddressesById(this.authService.getUserId()).subscribe((addresses: Address[]) => {
      this.addresses = addresses;
    });
  }

  placeOrder() {
    // this.orderService.createOrder(this.addressId, this.paymentForm.value.cardType, this.paymentForm.value.last4CardDigits)
  }
}
