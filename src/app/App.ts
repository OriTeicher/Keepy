import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/Navbar/Navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './App.html',
  styleUrl: './App.scss',
})
export class AppComponent {
  title = 'Googel Keep';
  pageHeader = 'Welcome to Googel Keep 🗒️';
}
