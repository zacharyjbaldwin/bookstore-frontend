import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public placeOrder(): void {
    this.notImplemented();
  }

  private notImplemented(): void {
    alert('501 not implemented');
  }

}
