import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: number[] = [1, 2, 3, 4];

  constructor() { }

  ngOnInit(): void {
  }

  public placeOrder(): void {
    this.notImplemented();
  }

  public notImplemented(): void {
    alert('501 not implemented');
  }

}
