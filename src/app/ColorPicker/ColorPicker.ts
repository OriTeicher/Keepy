import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NOTES_GRADIENTS, NOTE_COLORS } from '../_services/note.demo.service'
import { COLOR_NOTE_ACTION, EMPTY_STR } from '../_services/actions.service'
import { NoteAction } from '../_interfaces/NoteAction'

@Component({
  selector: 'color-picker',
  standalone: true,
  imports: [],
  templateUrl: './ColorPicker.html',
  styleUrl: './ColorPicker.scss',
})
export class ColorPickerComponent {
  @Input() noteId: string = EMPTY_STR
  @Output() selectedColor = new EventEmitter<NoteAction>()

  colors = NOTE_COLORS
  gradients = NOTES_GRADIENTS
  handleSelectColor(color: string) {
    this.selectedColor.emit({
      noteId: this.noteId,
      type: COLOR_NOTE_ACTION,
      data: color,
    })
  }
}
