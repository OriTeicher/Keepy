import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { heroBars4, heroUserCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './Navbar.html',
  styleUrls: ['./Navbar.scss', '../../main.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ heroBars4, heroUserCircle })],
})
export class NavbarComponent {
  isMenuOpen = true;
  @Output() toggleMenuClick = new EventEmitter<boolean>();
  handleToggleMenu() {
    console.log('toggle');
    this.toggleMenuClick.emit(false);
  }
}
