import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { getRandomColor, makeId, noteService } from '../_services/note-service'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { Note } from '../_interfaces/note'
import {
  COLOR_NOTE_ACTION,
  COPY_NOTE_ACTION,
  REMOVE_NOTE_ACTION,
} from '../_services/consts-service'

@Component({
  selector: 'note-index',
  standalone: true,
  imports: [CommonModule, NoteBottomActionsComponent],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  notes: Note[] = []

  ngOnInit() {
    this.notes = noteService.getDemoNotes()
  }

  get getNotesAmount() {
    return this.notes.length
  }

  handleMouseOver(noteId: string) {
    this.notes[this.notes.findIndex((note) => note._id === noteId)].isHovered =
      true
  }

  handleMouseOut(noteId: string) {
    this.notes[this.notes.findIndex((note) => note._id === noteId)].isHovered =
      false
  }

  removeNote(noteId: string) {
    this.notes = this.notes.filter((note) => note._id !== noteId)
  }

  duplicateNote(noteId: string) {
    const noteToCopy = this.notes.find((note) => note._id === noteId)
    if (!noteToCopy) return
    const noteCopy: Note = { ...noteToCopy, _id: makeId() }
    this.notes.unshift(noteCopy)
  }

  paintNote(noteId: string) {
    const noteIdx = this.notes.findIndex((note) => note._id === noteId)
    this.notes[noteIdx].color = getRandomColor()
  }

  onNoteAction(action: { noteId: string; type: string }) {
    switch (action.type) {
      case REMOVE_NOTE_ACTION:
        this.removeNote(action.noteId)
        break
      case COLOR_NOTE_ACTION:
        this.paintNote(action.noteId)
        break
      case COPY_NOTE_ACTION:
        this.duplicateNote(action.noteId)
        break
    }
  }
}
