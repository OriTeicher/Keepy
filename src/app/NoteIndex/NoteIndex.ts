import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'note-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  notes = [
    {
      title: 'this is a note... '.repeat(20),
      createdAt: '02/05 10:30',
      color: 'lightseagreen',
    },
    {
      title: 'this is a note... '.repeat(20),
      createdAt: '02/05 10:30',
      color: 'lightskyblue',
    },
    {
      title: '  this is a note...',
      createdAt: '02/05 10:30',
      color: 'purple',
    },
    {
      title: 'this is a note... '.repeat(10),
      createdAt: '02/05 10:30',
      color: 'lightgreen',
    },
    {
      title: 'this is a note...',
      createdAt: '02/05 10:30',
      color: 'lightcoral',
    },
    {
      title: 'this is a note... '.repeat(20),
      createdAt: '02/05 10:30',
      color: 'lightseagreen',
    },
    {
      title: 'this is a note...',
      createdAt: '02/05 10:30',
      color: 'pink',
    },
    {
      title: 'this is a note... '.repeat(20),
      createdAt: '02/05 10:30',
      color: 'white',
    },
    {
      title: '  this is a note...',
      createdAt: '02/05 10:30',
      color: 'purple',
    },
    {
      title: 'this is a note... '.repeat(10),
      createdAt: '02/05 10:30',
      color: 'lightgreen',
    },
  ];
}
