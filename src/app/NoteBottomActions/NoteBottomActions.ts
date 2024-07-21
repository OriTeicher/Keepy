import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matDeleteForever,
  matContentCopy,
  matColorLens,
  matCropOriginal,
} from '@ng-icons/material-icons/baseline';
@Component({
  selector: 'note-bottom-actions',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({
      matDeleteForever,
      matContentCopy,
      matColorLens,
      matCropOriginal,
    }),
  ],
  templateUrl: './NoteBottomActions.html',
  styleUrl: './NoteBottomActions.scss',
})
export class NoteBottomActionsComponent {
  icons = [
    { type: 'remove', svg: 'matDeleteForever' },
    { type: 'edit', svg: 'matContentCopy' },
    { type: 'color', svg: 'matColorLens' },
    { type: 'img', svg: 'matCropOriginal' },
  ];

  handleAction(type: string) {
    console.log('action:\n', type);
  }
}
