import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { CardType } from '../shared/card-type.enum';
import { OrderStatus } from '../shared/order-status.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private sampleOrder: Order = {
    _id: '<order id>',
    creator: '<user id>',
    contents: [
      {
        bookId: '<book id>',
        quantity: 3
      },
      {
        bookId: '<book id>',
        quantity: 1
      }
    ],
    address: {
      sendTo: 'Zachary Baldwin',
      addrLine1: '123 Main St',
      addrLine2: 'BLDG 7 UNIT 401',
      city: 'Van Alstyne',
      state: 'TX',
      zip: 75495
    },
    cardType: CardType.VISA,
    last4CardDigits: 1234,
    shippingPrice: 5,
    status: OrderStatus.Shipped,
    subtotal: 17.49,
    tax: 1.25,
    timestamp: 'Wed, 05 Oct 2022 00:39:12 GMT',
    totalPrice: 23.74
  }

  constructor(private http: HttpClient) { }

  public getOrderById(orderId: string): Observable<Order> {
    // TODO GET .../api/order/<orderId>
    this.sampleOrder._id = orderId;
    return of(this.sampleOrder);
  }

  public createOrder(addressId: string, cardType: CardType, last4CardDigits: number, status: OrderStatus, shippingPrice: number, subtotal: number, tax: number, totalPrice: number) {
    return this.http.post(`${environment.apiUrl}/api/order`, {
      addressId: addressId,
      cardType: cardType,
      last4CardDigits: last4CardDigits,
      status: status,
      shippingPrice: shippingPrice,
      subtotal: subtotal,
      tax: tax,
      totalPrice: totalPrice
    });
  }
}
