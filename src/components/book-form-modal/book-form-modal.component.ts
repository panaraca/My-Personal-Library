
import { Component, ChangeDetectionStrategy, input, output, model, effect } from '@angular/core';
import { Book, BookStatus } from '../../models/book.model';

@Component({
  selector: 'app-book-form-modal',
  templateUrl: './book-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormModalComponent {
  book = input<Book | null>(null);
  save = output<Omit<Book, 'id'> & { id?: number }>();
  close = output<void>();

  id = model<number | undefined>(undefined);
  title = model('');
  author = model('');
  genre = model('');
  rating = model(0);
  status = model<BookStatus>('To Read');

  genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Thriller', 'Romance', 'Non-Fiction', 'Biography', 'History'];
  statuses: BookStatus[] = ['To Read', 'Reading', 'Finished'];

  hoverRating = 0;

  isEditing = false;

  constructor() {
    effect(() => {
      const currentBook = this.book();
      this.isEditing = !!currentBook;
      if (currentBook) {
        this.id.set(currentBook.id);
        this.title.set(currentBook.title);
        this.author.set(currentBook.author);
        this.genre.set(currentBook.genre);
        this.rating.set(currentBook.rating);
        this.status.set(currentBook.status);
      } else {
        this.resetForm();
      }
    });
  }

  private resetForm(): void {
    this.id.set(undefined);
    this.title.set('');
    this.author.set('');
    this.genre.set('');
    this.rating.set(0);
    this.status.set('To Read');
  }

  onSubmit(): void {
    if (!this.title() || !this.author() || !this.genre()) {
        // Basic validation
        return;
    }
    const bookData = {
      id: this.id(),
      title: this.title(),
      author: this.author(),
      genre: this.genre(),
      rating: this.rating(),
      status: this.status(),
    };
    this.save.emit(bookData);
  }

  onClose(): void {
    this.close.emit();
  }

  setRating(value: number): void {
    this.rating.set(value);
  }
  
  setHoverRating(value: number): void {
    this.hoverRating = value;
  }
}
