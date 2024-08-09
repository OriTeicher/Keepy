import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { Note } from '../_interfaces/note'
import { NoteService } from '../_services/note.service'
import { FormsModule } from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
  selector: 'App-note-details',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './NoteDetails.html',
  styleUrls: ['../AddNote/AddNote.scss', './NoteDetails.scss'],
})
export class NoteDetailsComponent implements OnInit {
  noteToEdit!: Note | undefined
  noteObservable!: Observable<Note>
  noteId!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.noteId = paramMap.get('noteId')!
      this.noteToEdit = this.noteService.getNoteByIdOptimistic(this.noteId)
      console.log('this.noteId', this.noteId)
    })
  }

  onUpdateNote(ev: Event) {
    ev.preventDefault()
    if (!this.noteToEdit) return
    const form = ev.target as HTMLFormElement
    const titleInput = form.elements.namedItem('title') as HTMLInputElement
    const txtInput = form.elements.namedItem('txt') as HTMLTextAreaElement
    this.noteToEdit.title = titleInput.value
    this.noteToEdit.txt = txtInput.value
    console.log('this.noteToEdit front', this.noteToEdit)
    this.noteService.updateNote(this.noteToEdit)
    this.router.navigate(['notes'])
  }

  closeDialog(): void {
    this.router.navigate(['notes'])
  }
}
