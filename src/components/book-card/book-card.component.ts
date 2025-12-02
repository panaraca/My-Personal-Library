
import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { Book, BookStatus } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  book = input.required<Book>();
  edit = output<Book>();
  delete = output<number>();

  statusColorClass = computed(() => {
    const status: BookStatus = this.book().status;
    switch (status) {
      case 'Finished':
        return 'bg-green-500 text-green-900';
      case 'Reading':
        return 'bg-blue-500 text-blue-900';
      case 'To Read':
        return 'bg-yellow-500 text-yellow-900';
      default:
        return 'bg-gray-500 text-gray-900';
    }
  });

  onEdit(): void {
    this.edit.emit(this.book());
  }

  onDelete(): void {
    this.delete.emit(this.book().id);
  }
}
