import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NOTES_GRADIENTS, NOTE_COLORS } from '../_services/note.demo.service'
import { COLOR_NOTE_ACTION, EMPTY_STR } from '../_services/consts.service'
import { NoteAction } from '../_interfaces/NoteAction'
import { Note } from '../_interfaces/Note'

@Component({
  selector: 'color-picker',
  standalone: true,
  imports: [],
  templateUrl: './ColorPicker.html',
  styleUrl: './ColorPicker.scss',
})
export class ColorPickerComponent {
  @Input() noteId!: string
  @Input() noteColor!: string
  @Input() selectedNote!: Note
  @Input() isColorPickerOpen!: boolean
  @Output() selectedColor = new EventEmitter<NoteAction>()

  activeColor: string = EMPTY_STR
  colors: string[] = NOTE_COLORS
  gradients: string[] = NOTES_GRADIENTS

  ngOnInit() {
    this.activeColor = this.noteColor
  }

  handleSelectColor(color: string) {
    this.activeColor = color
    this.selectedColor.emit({
      noteId: this.noteId,
      type: COLOR_NOTE_ACTION,
      data: color,
    })
  }
}
