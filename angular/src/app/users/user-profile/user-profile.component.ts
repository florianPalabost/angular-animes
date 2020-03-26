import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {AnimesService} from '../../services/animes.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  animesStatus = {
    'completed': [],
    'watching': [],
    'want_to_watch': [],
    'dont_want_to_watch': [],
    'rewatched': []
  };
  allTimeSpent = 0;
  nbEpisodes = 0;
  data: any;
  user: any;

  constructor(private usersService: UsersService, private animeService: AnimesService) { }

  async ngOnInit() {
    this.user = await this.usersService.currentUserValue['user'];
    this.data = await this.animeService.retrieveAnimesCompletedByUser(this.user.id);
    if (this.data) {
      this.animesStatus.completed = await this.data['completed'].length > 0 ? this.data['completed'] : null;
      this.animesStatus.watching = await this.data['watching'].length > 0 ? this.data['watching'] : null;
      this.animesStatus.want_to_watch = await this.data['want_to_watch'].length > 0 ? this.data['want_to_watch'] : null;
      this.animesStatus.dont_want_to_watch = await this.data['dont_want_to_watch'].length > 0 ? this.data['dont_want_to_watch'] : null;
      this.animesStatus.rewatched = await this.data['rewatched'].length > 0 ? this.data['rewatched'] : null;

      this.animesStatus.completed.forEach((item) => {
        this.nbEpisodes += item['anime'].nbEpisode;
        this.allTimeSpent += (item['anime'].nbEpisode * item['anime'].episodeLength);
      });

      // transform from min to hours
      this.allTimeSpent = Math.round(this.allTimeSpent / 60);

    }

  }

}
