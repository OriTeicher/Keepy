import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { noteService } from '../_services/note.demo.service'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { Note } from '../_interfaces/Note'
import {
  COLOR_NOTE_ACTION,
  COPY_NOTE_ACTION,
  REMOVE_NOTE_ACTION,
} from '../_services/actions.service'
import { NoteService } from '../_services/note.service.service'
import { ColorPickerComponent } from '../ColorPicker/ColorPicker'
import { getRandomColor, makeId } from '../_services/util.service'
@Component({
  selector: 'note-index',
  standalone: true,
  imports: [CommonModule, NoteBottomActionsComponent, ColorPickerComponent],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  constructor(private notesService: NoteService) {}
  notes: Note[] = []

  ngOnInit() {
    this.notes = noteService.getDemoNotes()
    this.notesService.setNotes(this.notes)
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
    this.notesService.removeNoteById(noteId)
  }

  duplicateNote(noteId: string) {
    const noteToCopy = this.notes.find((note) => note._id === noteId)
    if (!noteToCopy) return
    const noteCopy: Note = { ...noteToCopy, _id: makeId() }
    this.notesService.addNote(noteCopy)
  }

  paintNote(color: string, noteId: string) {
    const noteIdx = this.notes.findIndex((note) => note._id === noteId)
    this.notes[noteIdx].color = color
  }

  onNoteAction(action: { noteId: string; type: string; data?: any }) {
    switch (action.type) {
      case REMOVE_NOTE_ACTION:
        this.removeNote(action.noteId)
        break
      case COLOR_NOTE_ACTION:
        this.paintNote(action.data, action.noteId)
        break
      case COPY_NOTE_ACTION:
        this.duplicateNote(action.noteId)
        break
    }
  }
}
