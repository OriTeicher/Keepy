import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { noteService } from '../_services/note-service';
import { NoteBottomActionsComponent } from '../NoteBottomActions/NoteBottomActions';

@Component({
  selector: 'note-index',
  standalone: true,
  imports: [CommonModule, NoteBottomActionsComponent],
  templateUrl: './NoteIndex.html',
  styleUrls: ['./NoteIndex.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteIndexComponent {
  notes: any[] = [];
  ngOnInit() {
    this.notes = noteService.getDemoNotes(20);
  }

  handleRemoveNote(noteId: string) {
    this.notes = this.notes.filter((note) => note._id !== noteId);
  }
}
