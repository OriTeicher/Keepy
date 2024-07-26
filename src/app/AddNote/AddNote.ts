import { Component, Output, EventEmitter } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ADD_UPDATE_NOTE_ACTION, EMPTY_STR } from '../_services/consts.service'
import { Note } from '../_interfaces/Note'
import { getEmptyNote, noteService } from '../_services/note.demo.service'
import { NoteAction } from '../_interfaces/NoteAction'
import { makeId } from '../_services/util.service'

@Component({
  selector: 'add-note',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './AddNote.html',
  styleUrls: ['./AddNote.scss'],
})
export class AddNoteComponent {
  title!: string
  description!: string
  isEditorActive!: boolean
  noteToAdd!: Note
  @Output() addNote = new EventEmitter<NoteAction>()

  ngOnInit() {
    this.title = EMPTY_STR
    this.description = EMPTY_STR
    this.isEditorActive = false
  }

  setTitle(ev: any): void {
    this.title = ev.target.value
  }

  setDescription(ev: any): void {
    this.description = ev.target.value
  }

  resetEditor(): void {
    this.title = EMPTY_STR
    this.description = EMPTY_STR
    console.log('EDITOR CLEAR')
  }

  handleAddNote(ev: any): void {
    ev.preventDefault()
    if (!this.title) throw new Error('Title is required!')
    const noteToAdd = getEmptyNote(this.title, this.description)
    this.addNote.emit({
      noteId: EMPTY_STR,
      type: ADD_UPDATE_NOTE_ACTION,
      data: noteToAdd,
    })
    this.resetEditor()
  }
}
