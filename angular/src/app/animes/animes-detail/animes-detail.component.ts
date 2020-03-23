import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Anime } from 'src/app/model/anime';
import { DomSanitizer } from '@angular/platform-browser';
import 'magnific-popup';
import {User} from '../../model/user';
import {UsersService} from '../../services/users.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-animes-detail',
  templateUrl: './animes-detail.component.html',
  styleUrls: ['./animes-detail.component.scss']
})
export class AnimesDetailComponent implements OnInit, OnDestroy  {
  public anime: Anime = new Anime;
  public animesRecommendated: any;
  public videoYT;
  public tmpURL;
  urlImg;
  formStatus: FormGroup;
  currentUser: User;
  statusCompleted = false;
  statusWatching = false;
  statusWantToWatch = false;
  statusDontWatch = false;
  rewatchedTimes;

  constructor(private userService: UsersService,
              private router: Router,
              private route: ActivatedRoute,
              private animesService: AnimesService,
              private sanitize: DomSanitizer,
              private  fb: FormBuilder) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  async ngOnInit() {
    this.formStatus = this.fb.group({
      status_watch: '',
      userId: '',
      animeId: ''
    });

    this.anime = await this.retriveAnimeByName(this.route.snapshot.params['name']);
    await this.retrieveAnimeUserStatus();
    this.animesRecommendated = await this.retrieveAnimeRecommendation(this.anime.id);
    this.rewatchedTimes = await this.animesService.retrieveNbWatchAnimeByUser(this.anime.id, this.currentUser['user'].id) || 0;
  }

  ngOnDestroy(): void {
    // console.log('unsubscribe detail');
    // this.subscription.unsubscribe();
  }

  retrieveAnimeUserStatus = async () => {
    if (this.currentUser !== null && this.anime !== null) {
          const infoUserAnime = {
            animeId: this.anime.id,
            userId: this.currentUser['user'].id
          };
          const statusWatch = await this.animesService.retrieveAnimeUserStatus(infoUserAnime);
         if (statusWatch) {
           this.statusCompleted = statusWatch['completed'].length > 0;
           this.statusWatching = statusWatch['watching'].length > 0;
           this.statusWantToWatch = statusWatch['want_to_watch'].length > 0;
           this.statusDontWatch = statusWatch['dont_want_to_watch'].length > 0;
         }
    }
  }

  retrieveAnimeRecommendation = async (idAnime) => {
    return  await this.animesService.findRecommendationAnime(idAnime);
  }

  retriveAnimeByName = async (name): Promise<Anime> => {
    const anime = await this.animesService.findAnimeByName(name);
    if (anime !== null ) {
      if (anime.startDate) {
        anime.startDate = anime.startDate.split('-')[1] + '/' + anime.startDate.split('-')[0];
      }
      if (anime.endDate) {
        anime.endDate = anime.endDate.split('-')[1] + '/' + anime.endDate.split('-')[0];
      }
      // To avoid XSS need tot use sanitize to create a "trust" ressource url !
      this.tmpURL = 'https://www.youtube.com/embed/' + anime.ytVideoID;
      this.videoYT = this.sanitize.bypassSecurityTrustResourceUrl(this.tmpURL);

      (<any>$('.magnific-youtube')).magnificPopup({
        type: 'iframe',
        iframe: {
          markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '<div class="mfp-title">Some caption</div>' +
            '</div>',
          patterns: {
            youtube: {
              index: 'youtube.com',
              id: 'v=',
              src: 'https://www.youtube.com/embed/' + anime.ytVideoID
            }
          }
        }
      });

      if (anime.coverImage) {
        anime.urlImg = await this.sanitize.bypassSecurityTrustStyle( `url(${anime.coverImage})`);
      } else if (anime.posterImage ) {
        anime.urlImg = await this.sanitize.bypassSecurityTrustStyle( `url(${anime.posterImage})`);
      } else {
        anime.urlImg = await
          this.sanitize.bypassSecurityTrustStyle('url(\'https://media.kitsu.io/anime/poster_images/10007/original.jpg?1460247262\')');
      }

    }

    return anime;
  }

  async updateStatUser(formStatus) {
    formStatus.userId = this.currentUser['user'].id;
    formStatus.animeId = this.anime.id;
    const status = await this.animesService.updateStatusAnimeUser(formStatus);
    switch (formStatus.status_watch) {
      case 'completed':
        this.statusCompleted = true;
        break;
      case 'watching':
        this.statusWatching = true;
        break;
      case 'want-to-watch':
        this.statusWantToWatch = true;
        break;
      case 'dont-watch':
        this.statusDontWatch = true;
        break;
      default:
        break;
    }

  }

  async rewatch() {
    const isUpdated = await this.animesService.updateRewatchAnime(this.anime.id, this.currentUser['user'].id);
    console.log('isUpdated :', isUpdated);
    if (isUpdated) {
      this.rewatchedTimes++;
    }
  }
}
