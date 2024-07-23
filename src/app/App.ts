import { Component } from '@angular/core'
import { NavbarComponent } from './Navbar/Navbar'
import { NoteIndexComponent } from './NoteIndex/NoteIndex'
import { SidebarComponent } from './Sidebar/Sidebar'
import { LabelsEditorComponent } from './LabelsEditor/LabelsEditor'
import { RouterModule } from '@angular/router'
import { MenuService } from './_services/menu.service'
import { CommonModule } from '@angular/common'
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './App.html',
  styleUrls: ['./App.scss', '../../src/main.scss'],
  imports: [
    CommonModule,
    NavbarComponent,
    LabelsEditorComponent,
    NoteIndexComponent,
    SidebarComponent,
    RouterModule,
  ],
})
export class AppComponent {
  title = 'Google Keep'
  constructor(public menuService: MenuService) {}
}
