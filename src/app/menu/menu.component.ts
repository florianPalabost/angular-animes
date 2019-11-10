import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public sideBarService: SidebarService) { }

  ngOnInit() {
  }

}
