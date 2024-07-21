import { Component } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matDeleteForever,
  matContentCopy,
  matColorLens,
  matCropOriginal,
  matDone,
} from '@ng-icons/material-icons/baseline'
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
      matDone,
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
    { type: 'todo', svg: 'matDone' },
  ]

  handleRemoveNote(noteId: string) {
    console.log('noteId', noteId)
  }

  handleIconClick(type: string, noteId: string) {
    switch (type) {
      case 'remove':
        this.handleRemoveNote(noteId)
        break
    }
  }
}
