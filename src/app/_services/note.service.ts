import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Note } from '../_interfaces/note'
import { HttpClient } from '@angular/common/http'
import axios from 'axios'

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private BASE_URL = 'http://localhost:5173/api'
  private notesSubject = new BehaviorSubject<Note[]>([])
  private removedNotesSubject = new BehaviorSubject<Note[]>([])
  private loadingSubject = new BehaviorSubject<boolean>(false)
  notes$ = this.notesSubject.asObservable()
  removedNotes$ = this.removedNotesSubject.asObservable()
  loading$ = this.loadingSubject.asObservable()

  constructor(private http: HttpClient) {}

  fetchNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.BASE_URL}/notes`)
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.http.get<Note>(`${this.BASE_URL}/notes/${noteId}`)
  }

  getNoteByIdOptimistic(noteId: string): Note {
    return this.notesSubject.value.find((note) => note._id === noteId)!
  }

  setNotes(notes: Note[]): void {
    // this.notesSubject.next(notes)
    // this.notesSubject.value = [...notes]
  }

  async addNote(noteToAdd: Note): Promise<void> {
    try {
      await axios.post(`${this.BASE_URL}/notes`, noteToAdd) // Send noteToAdd directly
      const currentNotes = [...this.notesSubject.value]
      currentNotes.unshift(noteToAdd)
      this.notesSubject.next(currentNotes)
      this.notesSubject.value.unshift(noteToAdd)
    } catch (err) {
      console.error(err)
    }
  }

  updateNote(noteToUpdate: Note): void {
    const currentNotes = [...this.notesSubject.value]
    const noteIdx = currentNotes.findIndex(
      (note) => note._id === noteToUpdate._id
    )
    currentNotes[noteIdx] = { ...noteToUpdate }
    this.notesSubject.next(currentNotes)

    const originalNoteIdx = this.notesSubject.value.findIndex(
      (note) => note._id === noteToUpdate._id
    )
    this.notesSubject.value[originalNoteIdx] = { ...noteToUpdate }
    this.http
      .put<Note>(`${this.BASE_URL}/notes/${noteToUpdate._id}`, noteToUpdate)
      .subscribe()
  }

  removeNoteById(noteId: string): void {
    const currentNotes = this.notesSubject.value.filter(
      (note) => note._id !== noteId
    )
    this.notesSubject.next(currentNotes)
  }

  // filterNotes(searchTerm: string): void {
  //   this.loadingSubject.next(true)
  //   const lowerCaseTerm = searchTerm.toLowerCase()
  //   const filteredNotes = this.originalNotes.filter((note) =>
  //     note.title.toLowerCase().includes(lowerCaseTerm)
  //   )
  //   this.notesSubject.next(filteredNotes)
  //   setTimeout(() => {
  //     this.loadingSubject.next(false)
  //   }, 500)
  // }

  // getFilteredNotes(searchTerm: string): Note[] {
  //   return this.originalNotes.filter((note) =>
  //     note.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  //   )
  // }
}
