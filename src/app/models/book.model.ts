export interface Book {
  title: string;
  author: string;
  isbn13: string;
  genre: string;
  imageUrl: string;
  summary?: string;
  price?: number;
  stock?: number;
}
