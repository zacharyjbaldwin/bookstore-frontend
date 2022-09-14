import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BookDetailsModalComponent } from '../modals/book-details-modal/book-details-modal.component';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
  styleUrls: ['./books-catalog.component.scss']
})
export class BooksCatalogComponent implements OnInit, OnDestroy {

  public genres = ['Adventure', 'Science Fiction', 'Horror', 'Non-Fiction', 'Drama'];
  public books: Book[] = [];
  public searchQuery?: string;
  public booksLoading: boolean = false;
  public loadingErrorMessage: string = '';

  public loggedIn = false;

  private subs = new Subscription();

  private loginModal?: BsModalRef;
  private bookDetailsModal?: BsModalRef;

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {  }

  ngOnInit(): void {
    this.booksLoading = true;
    this.subs.add(this.bookService.getBooks().subscribe((books => {
      this.books = books;
      this.booksLoading = false;
    })))

    this.subs.add(this.bookService.booksListChanged.subscribe((books) => {
      this.books = books;
      this.booksLoading = false;
    }));

    this.subs.add(this.bookService.booksListLoadFailure.subscribe((failed) => {
      if (failed) {
        this.booksLoading = false;
        this.loadingErrorMessage = 'Failed to load books. Please try again later.';
      }
    }));
  }

  addToCart() {
    if (!this.loggedIn) {
      this.loginModal = this.modalService.show(LoginModalComponent);
      (this.loginModal.content as LoginModalComponent).loggedIn.subscribe(() => {
        this.toastr.success('Added to cart!');
        this.cartService.cartChanged.next(1);
        this.loggedIn = true;
      });
    } else {
      this.toastr.success('Added to cart!');
      this.cartService.cartChanged.next(1);
    }
  }

  updateSearch() {
    // if (this.searchQuery == '') {
    //   this.books = this.bookService.getBooks();
    // } else {
    //   const query = this.searchQuery!.trim().toLowerCase();
    //   this.books = this.bookService.getBooks().filter((book) => {
    //     const show = book.title.toLowerCase().includes(query)
    //       || book.author.toLowerCase().includes(query)
    //       || book.genre.toLowerCase().includes(query)
    //       || book.isbn13.toLowerCase().includes(query);

    //     return show;
    //   });
    // }
  }

  clearFilters() {
    // this.searchQuery = '';
    // this.books = this.bookService.getBooks();
  }

  viewDetails(index: number) {
    this.bookDetailsModal = this.modalService.show(BookDetailsModalComponent, { class: 'modal-lg', initialState: { index: index } });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
