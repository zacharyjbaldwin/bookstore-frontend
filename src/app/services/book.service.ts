import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subject } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public booksListChanged = new Subject<Book[]>();
  public booksListLoadFailure = new Subject<boolean>();
  public books: Book[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.http.get<{ message: string, books: Book[] }>(`${environment.apiUrl}/api/books`).subscribe({
      next: (res) => {
        this.books = res.books;
        this.booksListChanged.next(this.books);
      },
      error: (error) => {
        this.booksListLoadFailure.next(true);
        this.toastr.error('Failed to load books. Please try again later.');
      }
    });
  }

  public addBook(book: Book) {
    this.http.post<{ message: string, book: any }>(`${environment.apiUrl}/api/books`, {
      title: book.title,
      author: book.author,
      genre: book.genre,
      summary: book.summary,
      isbn13: book.isbn13,
      price: book.price,
      quantityInStock: book.quantityInStock,
      imageUrl: book.imageUrl
    }).subscribe({
      next: () => {
        this.fetchBooks();
        this.toastr.success(`Added ${book.title}`);
      },
      error: () => {
        this.toastr.error(`Failed to add ${book.title}. Please try again later.`);
      }
    })
  }

  public deleteBook(index: number) {
    const book = this.getBookAtIndex(index);
    this.http.delete(`${environment.apiUrl}/api/books/${book._id}`).subscribe({
      next: () => {
        this.toastr.success(`Deleted ${book.title}`);
        this.fetchBooks();
      },
      error: () => {
        this.toastr.error(`Failed to delete ${book.title}. Please try again later.`);
      }
    });
  }

  public editBook(book: Book): void {
    this.http.put<{ message: string, response: Book }>(`${environment.apiUrl}/api/books/${book._id}`, book).subscribe({
      next: (res) => {
        this.toastr.success('Saved changes!');
        this.fetchBooks();
      },
      error: (error) => {
        this.toastr.error('Failed to save changes. Please try again later.');
      }
    });
  }

  public getBooks(): Observable<Book[]> {
    this.http.get<{ message: string, books: Book[] }>(`${environment.apiUrl}/api/books`).subscribe({
      next: (res) => {
        this.books = res.books;
        this.booksListChanged.next(this.books);
        return of([...this.books]);
      },
      error: (error) => {
        this.booksListLoadFailure.next(true);
        this.toastr.error('Failed to load books. Please try again later.');
      }
    });
    return of([...this.books]);
  }

  private fetchBooks(): void {
    this.http.get<{ message: string, books: Book[] }>(`${environment.apiUrl}/api/books`).subscribe({
      next: (res) => {
        this.books = res.books;
        this.booksListChanged.next(this.books);
      },
      error: (error) => {
        this.booksListLoadFailure.next(true);
        this.toastr.error('Failed to load books. Please try again later.');
      }
    });
  }

  public getBookAtIndex(index: number): Book {
    return this.books[index];
  }

  public getBookById(id: string): Book | undefined {
    return this.books.find(b => b._id == id);
  }
}
