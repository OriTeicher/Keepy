import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Bin.html',
  styleUrl: './Bin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinComponent {}
