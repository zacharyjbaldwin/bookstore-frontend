import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { BookService } from './book.service';

interface CartDto {
  message: string;
  cart: {
    owner: string,
    contents: { item: Book, quantity: number }[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChanged = new Subject<number>();

  constructor(
    private http: HttpClient
  ) { }

  public getCart(userId: string) {
    return this.http.get<CartDto>(`${environment.apiUrl}/api/cart/${userId}`)
      .pipe(
        map((res) => { return res.cart })
      );
  }

  public setQuantity(bookId: string, quantity: number) {
    return this.http.put(`${environment.apiUrl}/api/cart/${bookId}`, { 'quantity': quantity });
  }

  public addToCart(bookId: string) {
    return this.http.post(`${environment.apiUrl}/api/cart`, { 'itemId': bookId });
  }
}
