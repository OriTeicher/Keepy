import { Component, EventEmitter, Output } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroBars4, heroUserCircle } from '@ng-icons/heroicons/outline'
import { MenuService } from '../_services/menu.service'
import { NoteService } from '../_services/note.service'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './Navbar.html',
  styleUrls: ['./Navbar.scss', '../../main.scss'],
  viewProviders: [provideIcons({ heroBars4, heroUserCircle })],
})
export class NavbarComponent {
  private searchTerm$ = new Subject<string>()
  loggedInUser = { username: 'OriT5799' }
  isMenuOpen = true
  @Output() toggleMenuClick = new EventEmitter<boolean>()

  constructor(
    private menuService: MenuService,
    private noteService: NoteService
  ) {
    this.searchTerm$
      .pipe(debounceTime(500))
      .subscribe((term) => this.noteService.filterNotes(term))
  }

  handleToggleMenu() {
    this.menuService.toggleMenu()
  }

  onSearchNotes(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value
    this.searchTerm$.next(searchTerm)
  }
}
