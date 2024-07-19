import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroPencilSolid,
  heroHashtagSolid,
  heroArchiveBoxXMarkSolid,
} from '@ng-icons/heroicons/solid';
import { MenuService } from '../_services/menu-service.service';

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
export class SidebarComponent {
  constructor(private router: Router, public menuService: MenuService) {}

  @Input() isMenuOpen = true;
  selectedRoute = 'notes';
  links = [
    { label: 'Notes', svg: 'heroPencilSolid', route: 'notes' },
    { label: 'Edit Labels', svg: 'heroHashtagSolid', route: 'labels' },
    { label: 'Bin', svg: 'heroArchiveBoxXMarkSolid', route: 'bin' },
  ];

  handleRouteSelect(route: string) {
    this.selectedRoute = route;
    this.router.navigate([route]);
  }
}
