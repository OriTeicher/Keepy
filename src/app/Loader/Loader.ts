import { Component } from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'loader',
  templateUrl: 'Loader.html',
  styleUrl: 'Loader.scss',
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class Loader {}
