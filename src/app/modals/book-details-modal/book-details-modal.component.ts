import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss']
})
export class BookDetailsModalComponent implements OnInit, OnDestroy {

  public index: number = 0;
  public book!: Book;
  private subs = new Subscription();

  constructor(
    private bookService: BookService,
    private modalRef: BsModalRef
  ) {
    this.subs.add(this.bookService.getBooks().subscribe((books) => {
      this.book = books[this.index];
    }))

    // this.book = this.bookService.getBooks()[this.index];
  }

  ngOnInit(): void {
    this.subs.add(this.bookService.getBooks().subscribe((books) => {
      this.book = books[this.index];
    }))
  }

  closeModal() {
    this.modalRef.hide();
  }

  addToCart() {
    alert('Not implemented.');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
