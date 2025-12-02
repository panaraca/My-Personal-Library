
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Book } from './models/book.model';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookFormModalComponent } from './components/book-form-modal/book-form-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookCardComponent, BookFormModalComponent],
})
export class AppComponent {
  books = signal<Book[]>([
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', rating: 5, status: 'Finished' },
    { id: 2, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', rating: 5, status: 'Finished' },
    { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Sci-Fi', rating: 4, status: 'Reading' },
    { id: 4, title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Non-Fiction', rating: 3, status: 'To Read' },
  ]);
  
  isModalOpen = signal(false);
  editingBook = signal<Book | null>(null);

  openAddModal(): void {
    this.editingBook.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(book: Book): void {
    this.editingBook.set(book);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingBook.set(null);
  }

  handleSaveBook(bookData: Omit<Book, 'id'> & { id?: number }): void {
    if (bookData.id) {
      // Update existing book
      this.books.update(books => 
        books.map(b => b.id === bookData.id ? { ...b, ...bookData } : b)
      );
    } else {
      // Add new book
      const newBook: Book = {
        ...bookData,
        id: Date.now(), // simple unique id generation
      };
      this.books.update(books => [...books, newBook]);
    }
    this.closeModal();
  }

  handleDeleteBook(bookId: number): void {
    this.books.update(books => books.filter(b => b.id !== bookId));
  }
}
