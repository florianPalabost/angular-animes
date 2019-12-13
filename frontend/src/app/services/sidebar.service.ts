import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  hideSideNav = true;

  constructor() { }

  toggleSideNav(): void {
    console.debug('btn clicked');

    this.hideSideNav = !this.hideSideNav;
  }
}
