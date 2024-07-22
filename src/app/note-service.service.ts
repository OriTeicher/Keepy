import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Note } from './_interfaces/note'
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>([])
  notes$ = this.notesSubject.asObservable()

  setNotes(notes: Note[]) {
    this.notesSubject.next(notes)
  }

  // addOrUpdateNote(note: Note) {
  //   const currentNotes = this.notesSubject.value
  //   const index = currentNotes.findIndex((n) => n._id === note._id)
  //   if (index !== -1) {
  //     currentNotes[index] = note // Update existing note
  //   } else {
  //     currentNotes.push(note) // Add new note
  //   }
  //   this.notesSubject.next(currentNotes)
  // }

  removeNoteById(noteId: string) {
    const currentNotes = this.notesSubject.value.filter(
      (note) => note._id !== noteId
    )
    console.log('currentNotes', currentNotes)
    this.notesSubject.next(currentNotes)
  }

  getNotesLength() {
    return this.notesSubject.value.length
  }
}
