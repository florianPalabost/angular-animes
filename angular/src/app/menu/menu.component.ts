import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../services/sidebar.service';
import {User} from '../model/user';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UsersService,
              private router: Router
              ) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    // todo add callback user have been logout, same thing wiht login & register
    this.router.navigate(['/']);
  }
}
