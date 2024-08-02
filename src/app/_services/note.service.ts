import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Note } from '../_interfaces/Note'

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>([])
  private loadingSubject = new BehaviorSubject<boolean>(false)
  notes$ = this.notesSubject.asObservable()
  loading$ = this.loadingSubject.asObservable()
  originalNotes: Note[] = []

  getNoteById(noteId: string): Note | undefined {
    return this.notesSubject.value.find((note) => noteId === note._id)
  }

  setNotes(notes: Note[]): void {
    this.notesSubject.next(notes)
  }

  addNote(noteToAdd: Note): void {
    const currentNotes = [...this.notesSubject.value]
    currentNotes.unshift(noteToAdd)
    this.notesSubject.next(currentNotes)
  }

  updateNote(noteToUpdate: Note): void {
    const currentNotes = [...this.notesSubject.value]
    const noteIdx = currentNotes.findIndex(
      (note) => note._id === noteToUpdate._id
    )
    currentNotes[noteIdx] = { ...noteToUpdate }
    this.notesSubject.next(currentNotes)
  }

  removeNoteById(noteId: string): void {
    const currentNotes = this.notesSubject.value.filter(
      (note) => note._id !== noteId
    )
    this.notesSubject.next(currentNotes)
  }

  filterNotes(searchTerm: string): void {
    this.loadingSubject.next(true)
    const lowerCaseTerm = searchTerm.toLowerCase()
    const filteredNotes = this.originalNotes.filter((note) =>
      note.title.toLowerCase().includes(lowerCaseTerm)
    )
    console.log('filteredNotes', filteredNotes)
    this.notesSubject.next(filteredNotes)
    setTimeout(() => {
      this.notesSubject.next(filteredNotes)
      this.loadingSubject.next(false)
    }, 500)
  }

  getFilteredNotes(searchTerm: string): Note[] {
    return this.originalNotes.filter((note) =>
      note.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }
}
