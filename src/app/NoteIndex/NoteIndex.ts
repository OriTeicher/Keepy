import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { noteService } from '../_services/note-service'
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions'
import { Note } from '../_interfaces/note'

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

  ngOnInit() {
    this.notes = noteService.getDemoNotes(20)
  }

  handleMouseOver(noteId: string) {
    this.notes[this.notes.findIndex((note) => note._id === noteId)].isHovered =
      true
  }

  handleMouseOut(noteId: string) {
    this.notes[this.notes.findIndex((note) => note._id === noteId)].isHovered =
      false
  }

  onNoteAction(action: { noteId: string; type: string }) {
    console.log('actionType', action.noteId, action.type)
    this.notes = this.notes.filter((note) => note._id !== action.noteId)
  }
}
