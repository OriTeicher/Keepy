import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { noteService } from '../_services/note.demo.service'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { Note } from '../_interfaces/Note'
import {
  ADD_UPDATE_NOTE_ACTION,
  COLOR_NOTE_ACTION,
  COPY_NOTE_ACTION,
  REMOVE_NOTE_ACTION,
} from '../_services/consts.service'
import { NoteService } from '../_services/note.service'
import { ColorPickerComponent } from '../ColorPicker/ColorPicker'
import { makeId } from '../_services/util.service'
import { HoverDirective } from '../_directives/note.hover.directive'
import { AddNoteComponent } from '../AddNote/AddNote'
import { NoteAction } from '../_interfaces/NoteAction'
@Component({
  selector: 'note-index',
  standalone: true,
  imports: [
    CommonModule,
    NoteBottomActionsComponent,
    ColorPickerComponent,
    AddNoteComponent,
    HoverDirective,
    AddNoteComponent,
  ],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  constructor(private notesService: NoteService) {}
  notes!: Note[]
  selectedNote!: Note | null
  isColorPickerOpen!: boolean

  ngOnInit(): void {
    this.selectedNote = {} as Note
    this.notes = noteService.getDemoNotes()
    this.notesService.setNotes(this.notes)
  }

  getNoteIdxById(noteId: string) {
    return this.notes.findIndex((note) => note._id === noteId)
  }

  addUpadteNote(noteId?: string, noteToAdd?: Note) {
    console.log('noteId,noteToAdd', noteId, noteToAdd)
    if (noteId) this.notes.splice(this.getNoteIdxById(noteId), 1, noteToAdd!)
    else this.notes.unshift({ ...noteToAdd!, _id: makeId() })
  }

  removeNote(noteId: string): void {
    this.notes = this.notes.filter((note) => note._id !== noteId)
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

  onNoteAction(action: NoteAction) {
    this.selectedNote = action.noteId
      ? this.notes[this.getNoteIdxById(action.noteId)]
      : null
    debugger
    switch (action.type) {
      case ADD_UPDATE_NOTE_ACTION:
        console.log('hello 2')
        this.addUpadteNote(action.noteId, action.data)
        break
      case REMOVE_NOTE_ACTION:
        this.removeNote(action.noteId!)
        break
      case COPY_NOTE_ACTION:
        this.duplicateNote(action.noteId!)
        break
      case COLOR_NOTE_ACTION:
        action.data
          ? this.paintNote(action.data, action.noteId!)
          : this.toggleColorPicker()
        break
    }
    this.notesService.setNotes(this.notes)
  }
}
