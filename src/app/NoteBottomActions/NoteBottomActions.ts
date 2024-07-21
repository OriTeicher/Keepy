import { Component, Input, Output, EventEmitter } from '@angular/core'
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
  @Input() noteId: string | null = null
  @Output() removeNote = new EventEmitter<string>()

  icons = [
    { type: 'remove', svg: 'matDeleteForever' },
    { type: 'copy', svg: 'matContentCopy' },
    { type: 'color', svg: 'matColorLens' },
    { type: 'img', svg: 'matCropOriginal' },
    { type: 'todo', svg: 'matDone' },
  ]

  onRemoveNote() {
    if (this.noteId) this.removeNote.emit(this.noteId)
  }

  handleIconClick(type: string) {
    switch (type) {
      case 'remove':
        this.onRemoveNote()
        break
    }
  }
}
