import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Navbar/Navbar';
import { NoteIndexComponent } from './NoteIndex/NoteIndex';
import { SidebarComponent } from './Sidebar/Sidebar';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NoteIndexComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarComponent,
    NgIconComponent,
  ],
  templateUrl: './App.html',
  styleUrl: './App.scss',
  viewProviders: [provideIcons({ heroUsers })],
})
export class AppComponent {
  title = 'Googel Keep';
}
