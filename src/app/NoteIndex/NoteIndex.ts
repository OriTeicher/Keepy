import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { noteService } from '../_services/note-service'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { Note } from '../_interfaces/note'
import {
  COLOR_NOTE_ACTION,
  COPY_NOTE_ACTION,
  REMOVE_NOTE_ACTION,
} from '../_services/consts-service'

@Component({
  selector: 'note-index',
  standalone: true,
  imports: [CommonModule, NoteBottomActionsComponent],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  notes: Note[] = []

  async ngOnInit() {
    try {
      this.notes = (await noteService.getDemoNotes(2)) || []
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  handleMouseOver(noteId: string) {
    this.notes[this.notes.findIndex((note) => note._id === noteId)].isHovered =
      true
  }

  handleMouseOut(noteId: string) {
    this.notes[this.notes.findIndex((note) => note._id === noteId)].isHovered =
      false
  }

  removeNote(noteId: string) {
    this.notes = this.notes.filter((note) => note._id !== noteId)
  }

  onNoteAction(action: { noteId: string; type: string }) {
    switch (action.type) {
      case REMOVE_NOTE_ACTION:
        this.removeNote(action.noteId)
        break
      case COLOR_NOTE_ACTION:
        console.log('color')
        break
      case COPY_NOTE_ACTION:
        console.log('copy')
        break
    }
  }
}
