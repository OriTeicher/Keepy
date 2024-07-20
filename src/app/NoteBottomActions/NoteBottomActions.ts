import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matDeleteForever } from '@ng-icons/material-icons/baseline';
@Component({
  selector: 'note-bottom-actions',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ matDeleteForever })],
  templateUrl: './NoteBottomActions.html',
  styleUrl: './NoteBottomActions.scss',
})
export class NoteBottomActionsComponent {
  btns = [
    { type: 'removeNote', svg: matDeleteForever },
    { type: 'removeNote', svg: matDeleteForever },
    { type: 'removeNote', svg: matDeleteForever },
    { type: 'removeNote', svg: matDeleteForever },
  ];

  handleAction(type: string) {
    console.log('action:\n', type);
  }
}
