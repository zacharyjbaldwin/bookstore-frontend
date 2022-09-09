import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  cart: string[] = [];
  private subs = new Subscription();
  showAdminButton: boolean = true;

  constructor(private cartService: CartService) {
    if (localStorage.getItem('showAdmin') == 'true') {
      this.showAdminButton = true;
    }
  }

  ngOnInit(): void {
    this.cartService.cartChanged.subscribe(() => {
      this.cart.push('asdf');
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
