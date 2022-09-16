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

  public book!: Book;
  public id: string = '';

  constructor(
    private bookService: BookService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.book = this.bookService.getBookById(this.id);
  }

  closeModal() {
    this.modalRef.hide();
  }

  addToCart() {
    alert('Not implemented.');
  }
}
