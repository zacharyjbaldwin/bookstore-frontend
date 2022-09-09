import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { AddBookModalComponent } from '../modals/add-book-modal/add-book-modal.component';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  // public addBookForm: FormGroup;
  public inventory: Book[] = [];
  private subs = new Subscription();
  public addBookModal?: BsModalRef;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {

    this.inventory = bookService.getBooks();
  }

  deleteBook(index: number) {
    this.bookService.deleteBook(index);
    // this.toastr.success(`Deleted ${this.bookService.getBooks()[index].title}`);
  }

  ngOnInit(): void {
    this.subs.add(this.bookService.booksListChanged.subscribe((books) => {
      this.inventory = books;
    }))
  }

  onSubmit() {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openAddBookModal() {
    this.addBookModal = this.modalService.show(AddBookModalComponent);
  }

}
