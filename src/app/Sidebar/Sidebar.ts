import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Sidebar.html',
  styleUrl: './Sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  links = [
    { label: 'Notes', svg: 'NoteSvg' },
    { label: 'Notes', svg: 'NoteSvg' },
    { label: 'Notes', svg: 'NoteSvg' },
  ];
}
