import { Routes } from '@angular/router'
import { NoteIndexComponent } from './app/NoteIndex/NoteIndex'
import { LabelsEditorComponent } from './app/LabelsEditor/LabelsEditor'
import { BinComponent } from './app/NotesBin/Bin'
import { EMPTY_STR } from './app/_services/consts.service'

export const routes: Routes = [
  { path: 'labels', component: LabelsEditorComponent },
  { path: 'notes', component: NoteIndexComponent },
  { path: 'bin', component: BinComponent },
  { path: EMPTY_STR, redirectTo: '/notes', pathMatch: 'full' },
  { path: '**', redirectTo: '/notes' },
]
