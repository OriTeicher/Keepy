import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/Navbar/Navbar';
import { NoteIndexComponent } from '../components/NoteIndex/NoteIndex';
import { SiderbarComponent } from '../components/Siderbar/Sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NoteIndexComponent,
    NavbarComponent,
    SiderbarComponent,
    SiderbarComponent,
  ],
  templateUrl: './App.html',
  styleUrl: './App.scss',
})
export class AppComponent {
  title = 'Googel Keep';
}
