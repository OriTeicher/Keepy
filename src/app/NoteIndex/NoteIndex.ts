import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core'
import { NoteService } from '../_services/note.service'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { Note } from '../_interfaces/Note'
import {
  ADD_UPDATE_NOTE_ACTION,
  COLOR_NOTE_ACTION,
  COPY_NOTE_ACTION,
  REMOVE_NOTE_ACTION,
} from '../_services/consts.service'
import { ColorPickerComponent } from '../ColorPicker/ColorPicker'
import { makeId } from '../_services/util.service'
import { HoverDirective } from '../_directives/note.hover.directive'
import { AddNoteComponent } from '../AddNote/AddNote'
import { NoteAction } from '../_interfaces/NoteAction'
import { Router, RouterModule } from '@angular/router'
import { Subscription } from 'rxjs'
import { noteService } from '../_services/note.demo.service'
import { Loader } from '../Loader/Loader'

@Component({
  selector: 'note-index',
  standalone: true,
  imports: [
    Loader,
    CommonModule,
    NoteBottomActionsComponent,
    ColorPickerComponent,
    AddNoteComponent,
    HoverDirective,
    RouterModule,
  ],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent implements OnInit, OnDestroy {
  constructor(
    private notesService: NoteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  notes!: Note[]
  selectedNote!: Note | null
  isColorPickerOpen!: boolean
  colorPickerTimeout!: number
  isLoadingNotes: boolean = false
  private subscription!: Subscription

  ngOnInit(): void {
    this.isLoadingNotes = true
    setTimeout(() => {
      this.subscription = this.notesService.notes$.subscribe((notes) => {
        this.notes = notes
        this.isLoadingNotes = false
        this.cdr.markForCheck()
      })
    }, 1800)
    const demoNotes = noteService.getDemoNotes(13)
    this.notesService.originalNotes = demoNotes
    this.notesService.setNotes(demoNotes)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getNoteIdxById(noteId: string): number {
    return this.notes.findIndex((note) => note._id === noteId)
  }

  addUpadteNote(noteId?: string, noteToAdd?: Note): void {
    if (noteId) {
      this.notes.splice(this.getNoteIdxById(noteId), 1, noteToAdd!)
    } else {
      this.notes.unshift({ ...noteToAdd!, _id: makeId() })
    }
    this.notesService.setNotes(this.notes)
  }

  removeNote(noteId: string): void {
    this.notes = this.notes.filter((note) => note._id !== noteId)
    this.notesService.setNotes(this.notes)
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
    this.notesService.setNotes(this.notes)
  }

  toggleColorPicker(): void {
    this.isColorPickerOpen = !this.isColorPickerOpen
    if (this.isColorPickerOpen) {
      setTimeout(() => {
        this.isColorPickerOpen = false
      }, 2500)
    }
  }

  displayNoteEditor(noteId: string): void {
    this.router.navigate(['notes', noteId])
  }

  onNoteAction(action: NoteAction): void {
    this.selectedNote = action.noteId
      ? this.notes[this.getNoteIdxById(action.noteId)]
      : null
    switch (action.type) {
      case ADD_UPDATE_NOTE_ACTION:
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
