import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Note } from '../_interfaces/Note'
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>([])
  notes$ = this.notesSubject.asObservable()

  getNoteById(noteId: string): Note | undefined {
    return this.notesSubject.value.find((note) => noteId === note._id)
  }

  setNotes(notes: Note[]): void {
    this.notesSubject.next(notes)
  }

  addNote(noteToAdd: Note): void {
    const currentNotes = this.notesSubject.value
    currentNotes.unshift(noteToAdd)
    this.notesSubject.next(currentNotes)
  }

  updateNote(noteToUpdate: Note): void {
    const noteIdx: number = this.notesSubject.value.findIndex(
      (note) => noteToUpdate._id === note._id
    )
    this.notesSubject.value.splice(noteIdx, 1, { ...noteToUpdate })
  }

  removeNoteById(noteId: string): void {
    const currentNotes = this.notesSubject.value.filter(
      (note) => note._id !== noteId
    )
    this.notesSubject.next(currentNotes)
  }

  getNotesLength(): number {
    return this.notesSubject.value.length
  }
}
