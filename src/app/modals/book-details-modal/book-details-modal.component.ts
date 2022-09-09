import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss']
})
export class BookDetailsModalComponent implements OnInit {

  public index: number = 0;
  public book: Book;

  constructor(
    private bookService: BookService,
    private modalRef: BsModalRef
  ) {
    this.book = this.bookService.getBooks()[this.index];
  }

  ngOnInit(): void {
    this.book = this.bookService.getBooks()[this.index];
  }

  closeModal() {
    this.modalRef.hide();
  }

  addToCart() {
    alert('Not implemented.');
  }

}
