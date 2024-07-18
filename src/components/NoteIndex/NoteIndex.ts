import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'note-index',
  standalone: true,
  imports: [CommonModule],
  template: `<p>NoteIndex works!</p>`,
  styleUrl: './NoteIndex.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  notes = [
    {
      title: 'this is a note...',
      createdAt: '02/05 10:30',
      color: 'lightseagreen',
    },
    {
      title: 'this is a note...',
      createdAt: '02/05 10:30',
      color: 'lightcoral',
    },
    {
      title: '  this is a note...',
      createdAt: '02/05 10:30',
      color: 'lightskyblue',
    },
  ];
}
