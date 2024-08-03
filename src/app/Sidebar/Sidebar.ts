import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core'
import { Router } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  heroPencilSolid,
  heroHashtagSolid,
  heroArchiveBoxXMarkSolid,
} from '@ng-icons/heroicons/solid'
import { MenuService } from '../_services/menu.service'
import { NoteService } from '../_services/note.service'

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      heroPencilSolid,
      heroHashtagSolid,
      heroArchiveBoxXMarkSolid,
    }),
  ],
  templateUrl: './Sidebar.html',
  styleUrls: ['./Sidebar.scss', '../../main.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isMenuOpen = true
  notesLength: number = 0
  removedNotesLength: number = 0
  labelsLength: number = 0
  selectedRoute = 'notes'
  links = [
    {
      label: 'Notes',
      svg: 'heroPencilSolid',
      route: 'notes',
    },
    {
      label: 'Labels',
      svg: 'heroHashtagSolid',
      route: 'labels',
      amount: `(0)`,
    },
    {
      label: 'Bin',
      svg: 'heroArchiveBoxXMarkSolid',
      route: 'bin',
    },
  ]

  constructor(
    private router: Router,
    public menuService: MenuService,
    private notesService: NoteService,
    private noteRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.notesService.notes$.subscribe((notes) => {
      this.links[0].amount = `(${notes.length})`
      this.noteRef.markForCheck()
    })
    this.notesService.removedNotes$.subscribe((removedNotes) => {
      this.links[2].amount = `(${removedNotes.length})`
      this.noteRef.markForCheck()
    })
  }

  handleRouteSelect(route: string) {
    this.selectedRoute = route
    this.router.navigate([route])
  }
}
