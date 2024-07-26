import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { noteService } from '../_services/note.demo.service'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { Note } from '../_interfaces/Note'
import {
  COLOR_NOTE_ACTION,
  COPY_NOTE_ACTION,
  REMOVE_NOTE_ACTION,
} from '../_services/consts.service'
import { NoteService } from '../_services/note.service'
import { ColorPickerComponent } from '../ColorPicker/ColorPicker'
import { makeId } from '../_services/util.service'
import { HoverDirective } from '../_directives/note.hover.directive'
@Component({
  selector: 'note-index',
  standalone: true,
  imports: [
    CommonModule,
    NoteBottomActionsComponent,
    ColorPickerComponent,
    HoverDirective,
  ],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  constructor(private notesService: NoteService) {}
  notes!: Note[]
  selectedNote!: Note
  isColorPickerOpen!: boolean

  ngOnInit(): void {
    this.selectedNote = {} as Note
    this.notes = noteService.getDemoNotes()
    this.notesService.setNotes(this.notes)
  }

  getNoteIdxById(noteId: string) {
    return this.notes.findIndex((note) => note._id === noteId)
  }

  removeNote(noteId: string): void {
    this.notes = this.notes.filter((note) => note._id !== noteId)
    this.notesService.removeNoteById(noteId)
  }

  duplicateNote(noteId: string): void {
    const noteToCopy = this.notes.find((note) => note._id === noteId)
    if (!noteToCopy) return
    const noteCopy: Note = { ...noteToCopy, _id: makeId() }
    this.notesService.addNote(noteCopy)
  }

  paintNote(color: string, noteId: string): void {
    const noteIdx = this.notes.findIndex((note) => note._id === noteId)
    this.notes[noteIdx].color = color
    this.toggleColorPicker()
  }

  toggleColorPicker() {
    this.isColorPickerOpen = !this.isColorPickerOpen
  }

  onNoteAction(action: { noteId: string; type: string; data?: any }) {
    this.selectedNote = this.notes[this.getNoteIdxById(action.noteId)]
    switch (action.type) {
      case REMOVE_NOTE_ACTION:
        this.removeNote(action.noteId)
        break
      case COPY_NOTE_ACTION:
        this.duplicateNote(action.noteId)
        break
      case COLOR_NOTE_ACTION:
        action.data
          ? this.paintNote(action.data, action.noteId)
          : this.toggleColorPicker()
        break
    }
  }
}
