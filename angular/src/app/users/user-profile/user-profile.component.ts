import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {AnimesService} from '../../services/animes.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  animesCompleted: Observable<Object>;
  animesWatching: Observable<Object>;
  animesWantToWatch: Observable<Object>;
  animesDontWatch: Observable<Object>;

  constructor(private usersService: UsersService, private animeService: AnimesService) { }

  ngOnInit() {
    // todo get animes user completed / watching / want to watch / dont want to watch
    // console.log('user id : ', this.usersService.currentUserValue['user'].id);

    this.animeService.retrieveAnimesCompletedByUser(this.usersService.currentUserValue['user'].id).subscribe((data) => {
      this.animesCompleted = data['completed'].length > 0 ? data['completed'] : null;
      this.animesWatching = data['watching'].length > 0 ? data['watching'] : null;
      this.animesWantToWatch = data['want_to_watch'].length > 0 ? data['want_to_watch'] : null;
      this.animesDontWatch = data['dont_want_to_watch'].length > 0 ? data['dont_want_to_watch'] : null;
      console.log('animes completed : ', data);
    });
  }

}
