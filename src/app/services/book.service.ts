import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public booksListChanged = new Subject<Book[]>();
  public books: Book[] = [
    {
      title: 'The Adventures of Tom Sawyer',
      author: 'Mark Twain',
      genre: 'Adventure',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71ZgqlEsGWL.jpg',
      isbn13: '0000000000000',
      summary: 'Tom Sawyer, a young Missouri lad, finds fun and adventure with his pals Joe Harper and Huckleberry Finn, running away to hide out on Jackson\'s Island and pretending to be Mississippi River pirates. When Tom is believed dead by his grieving Aunt Polly, he sneaks back to town to attend his own funeral.',
      price: 4,
      stock: 17
    },
    {
      title: 'Moby Dick',
      author: 'Herman Melville',
      genre: 'Adventure',
      imageUrl: 'https://kbimages1-a.akamaihd.net/34c5bfd3-a8d0-4500-a321-a1533c3af3f7/1200/1200/False/moby-dick-118.jpg',
      isbn13: '0000000000000',
      summary: 'Moby-Dick; or, The Whale is an 1851 novel by American writer Herman Melville. The book is the sailor Ishmael\'s narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge against Moby Dick, the giant white sperm whale that on the ship\'s previous voyage bit off Ahab\'s leg at the knee.'
    },
    {
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      genre: '',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71CcO-jvRUL.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'The Giver',
      author: 'Lois Lowry',
      genre: '',
      imageUrl: 'https://m.media-amazon.com/images/I/51R8AA8QEVL.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'Of Mice and Men',
      author: 'John Steinbeck',
      genre: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Of_Mice_and_Men_%281937_1st_ed_dust_jacket%29.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'Atlas Shrugged',
      author: 'Ayn Rand',
      genre: '',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Atlas_Shrugged_%281957_1st_ed%29_-_Ayn_Rand.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'A Modest Proposal',
      author: 'Jonathan Swift',
      genre: '',
      imageUrl: 'https://thebaffler.com/wp-content/uploads/2014/06/ModestProposal1.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'The Once and Future King',
      author: 'T.H. White',
      genre: '',
      imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388583899l/10571.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      author: 'Douglas Adams',
      genre: '',
      imageUrl: 'https://api.time.com/wp-content/uploads/2014/10/hitchhiker-s-guide-douglas-adams-657242_451_700.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'A Tale of Two Cities',
      author: 'Charles Dickens',
      genre: '',
      imageUrl: 'https://kbimages1-a.akamaihd.net/b6cc787d-79b3-4322-bfae-7bbf6ed59a77/1200/1200/False/a-tale-of-two-cities-431.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'The Screwtape Letters',
      author: 'C.S. Lewis',
      genre: '',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81iGfP5-GNL.jpg',
      isbn13: '0000000000000'
    },
    {
      title: 'The Abolition of Man',
      author: 'C.S. Lewis',
      genre: '',
      imageUrl: 'http://prodimage.images-bn.com/pimages/9780060652944_p0_v12_s1200x630.jpg',
      isbn13: '0000000000000'
    },
  ];

  constructor() { }

  public addBook(title: string, author: string, genre: string, isbn13: string, imageUrl: string) {
    this.books.push({
      title: title,
      author: author,
      genre: genre,
      isbn13: isbn13,
      imageUrl: imageUrl
    });
  }

  public deleteBook(index: number) {
    // this.books = this.books.slice(index, 1);
    this.books.splice(index, 1);
    this.booksListChanged.next([...this.books]);
  }

  public getBooks(): Book[] {
    return [...this.books];
  }
}
