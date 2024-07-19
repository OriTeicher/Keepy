import { Routes } from '@angular/router';
import { NoteIndexComponent } from './app/NoteIndex/NoteIndex';
import { LabelsEditorComponent } from './app/LabelsEditor/LabelsEditor';
import { BinComponent } from './app/Bin/Bin';

export const routes: Routes = [
  { path: 'labels', component: LabelsEditorComponent },
  { path: 'notes', component: NoteIndexComponent },
  { path: 'bin', component: BinComponent },
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: '**', redirectTo: '/notes' },
];
