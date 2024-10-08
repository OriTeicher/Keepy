import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { Subscription } from 'rxjs'

import { NoteService } from '../_services/note.service'
import { noteService } from '../_services/note.demo.service'
import { makeId } from '../_services/util.service'
import {
  ADD_UPDATE_NOTE_ACTION,
  COLOR_NOTE_ACTION,
  COPY_NOTE_ACTION,
  REMOVE_NOTE_ACTION,
} from '../_services/consts.service'

import { Note } from '../_interfaces/NoteInterface'
import { NoteAction } from '../_interfaces/NoteAction'

import { Loader } from '../Loader/Loader'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { ColorPickerComponent } from '../ColorPicker/ColorPicker'
import { HoverDirective } from '../_directives/note.hover.directive'
import { AddNoteComponent } from '../AddNote/AddNote'

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
    private http: HttpClient,
    private notesService: NoteService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  BASE_URL = 'http://localhost:5173/api'
  BIN_ROUTE = 'bin'
  notesToDisplay!: Note[]
  selectedNote!: Note | null
  isColorPickerOpen!: boolean
  colorPickerTimeout!: number
  test!: string
  isLoadingNotes: boolean = false
  private subscription!: Subscription
  private routeSubscription!: Subscription

  // ? ** backend ** ?
  ngOnInit(): void {
    this.isLoadingNotes = true
    this.routeSubscription = this.route.url.subscribe(() => {
      this.loadRegularNotes()
      // const isBinRoute = segments.some(
      //   (segment) => segment.path === this.BIN_ROUTE
      // )
      // isBinRoute ? this.loadRemovedNotes() : this.loadRegularNotes()
    })
  }
  // ? ** frontend ** ?
  // ngOnInit(): void {
  //   this.loadDemoNotes()
  // }

  async loadRegularNotes(): Promise<void> {
    this.isLoadingNotes = true
    this.subscription = await this.notesService
      .fetchNotes()
      .subscribe((res) => {
        this.cdr.markForCheck()
        const { notes }: any = res
        this.notesToDisplay = notes
        this.isLoadingNotes = false
      })
  }

  loadDemoNotes(): void {
    this.notesToDisplay = noteService.getDemoNotes(5)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  getNoteIdxById(noteId: string): number {
    return this.notesToDisplay.findIndex((note) => note._id === noteId)
  }

  addUpadteNote(noteId?: string, noteToAdd?: Note): void {
    if (noteId) {
      this.notesToDisplay.splice(this.getNoteIdxById(noteId), 1, noteToAdd!)
      this.notesService.updateNote(noteToAdd!)
    } else {
      this.notesToDisplay.unshift({ ...noteToAdd! })
      this.notesService.addNote(noteToAdd!)
    }

    this.loadRegularNotes()
  }

  removeNote(noteId: string): void {
    const noteToRemoveIdx = this.notesToDisplay.findIndex(
      (note) => note._id !== noteId
    )
    const removedNote = this.notesToDisplay.splice(noteToRemoveIdx, 1)[0]
    // this.notesService.moveNoteToBin(removedNote._id)
  }

  duplicateNote(noteId: string): void {
    const noteToCopy = this.notesToDisplay.find((note) => note._id === noteId)
    if (!noteToCopy) return
    const noteCopy: Note = { ...noteToCopy, _id: makeId() }
    this.notesService.addNote(noteCopy)
  }

  paintNote(color: string, noteId: string): void {
    const noteIdx = this.notesToDisplay.findIndex((note) => note._id === noteId)
    this.notesToDisplay[noteIdx].color = color
    this.notesService.updateNote(this.notesToDisplay[noteIdx])
  }

  toggleColorPicker(): void {
    this.isColorPickerOpen = !this.isColorPickerOpen
    if (this.isColorPickerOpen) {
      setTimeout(() => {
        this.isColorPickerOpen = false
      }, 2500)
    }
  }

  displayNoteEditor(event: Event, noteId: string): void {
    event.preventDefault()
    event.stopPropagation()
    this.router.navigate(['notes', noteId])
  }

  onNoteAction(action: NoteAction): void {
    this.selectedNote = action.noteId
      ? this.notesToDisplay[this.getNoteIdxById(action.noteId)]
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
    this.notesService.setNotes(this.notesToDisplay)
  }
}

// loadRemovedNotes(): void {
//   console.log('removed notes')
//   this.isLoadingNotes = true
//   this.subscription = this.notesService
//     .fetchRemovedNotes()
//     .subscribe((notes) => {
//       this.notes = notes
//       this.isLoadingNotes = false
//       this.cdr.markForCheck()
//     })
// }
