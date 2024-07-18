import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Navbar/Navbar';
import { NoteIndexComponent } from './NoteIndex/NoteIndex';
import { SidebarComponent } from './Sidebar/Sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NoteIndexComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarComponent,
  ],
  templateUrl: './App.html',
  styleUrl: './App.scss',
})
export class AppComponent {
  title = 'Googel Keep';
}
