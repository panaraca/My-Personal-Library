
export type BookStatus = 'To Read' | 'Reading' | 'Finished';

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number; // Rating from 0 to 5
  status: BookStatus;
}
