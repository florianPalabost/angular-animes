import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Anime } from 'src/app/model/anime';
import { Subscription } from 'rxjs';
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
  private subscription: Subscription;
  public videoYT;
  public tmpURL;
  urlImg;
  formStatus: FormGroup;

  currentUser: User;
  statusCompleted = false;
  statusWatching = false;
  statusWantToWatch = false;
  statusDontWatch = false;

  // @ViewChild('video') videoElement: ElementRef;

  constructor(private userService: UsersService,
              private router: Router,
              private route: ActivatedRoute,
              private animesService: AnimesService,
              private sanitize: DomSanitizer,
              private  fb: FormBuilder) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // const locStorageObj = localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')) : null;
    this.retriveAnimeByName(this.route.snapshot.params['name']);
    // console.log('user role ? ' + locStorageObj.user.role);
    // this.currentUser = locStorageObj !== null ? locStorageObj.user : null ;
    this.formStatus = this.fb.group({
      status_watch: '',
      userId: '',
      animeId: ''
    });

  }

  ngOnDestroy(): void {
    console.log('unsubscribe detail');
    this.subscription.unsubscribe();
  }


  retriveAnimeByName = async (name) => {
    this.subscription = await this.animesService.findAnimeByName(name).subscribe(data => {
      this.anime = data;
      if (this.anime.startDate) {
        this.anime.startDate = this.anime.startDate.split('-')[1] + '/' + this.anime.startDate.split('-')[0];
      }
      if (this.anime.endDate) {
        this.anime.endDate = this.anime.endDate.split('-')[1] + '/' + this.anime.endDate.split('-')[0];
      }

      if (this.currentUser !== null) {
        const infoUserAnime = {
          animeId: this.anime.id,
          userId: this.currentUser['user'].id
        };
       //  console.log('infos :::', infoUSerAnime);
        this.animesService.retrieveAnimeUserStatus(infoUserAnime).subscribe((statusWatch) => {
          console.log('alo:', statusWatch);
          if (statusWatch.length > 0) {
            this.statusCompleted = true;
          }
          this.statusCompleted = statusWatch.completed.length > 0;
          this.statusWatching = statusWatch.watching.length > 0;
          this.statusWantToWatch = statusWatch.want_to_watch.length > 0;
          this.statusDontWatch = statusWatch.dont_want_to_watch.length > 0;
        });

      }

      // To avoid XSS need tot use sanitize to create a "trust" ressource url !
      this.tmpURL = 'https://www.youtube.com/embed/' + this.anime.ytVideoID;
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
              src: 'https://www.youtube.com/embed/' + this.anime.ytVideoID
            }
          }
        }
      });

      if (this.anime.coverImage !== null) {
        this.urlImg =  this.sanitize.bypassSecurityTrustStyle( `url(${this.anime.coverImage})`);
      } else if (this.anime.posterImage !== null) {
        this.urlImg =  this.sanitize.bypassSecurityTrustStyle( `url(${this.anime.posterImage})`);
      } else {
        this.urlImg =
          this.sanitize.bypassSecurityTrustStyle('url(\'https://media.kitsu.io/anime/poster_images/10007/original.jpg?1460247262\')');
      }
    });

  }

  updateStatUser(formStatus) {
    formStatus.userId = this.currentUser['user'].id;
    formStatus.animeId = this.anime.id;
    console.log(formStatus);
    this.animesService.updateStatusAnimeUser(formStatus).subscribe((status) =>  {
      // todo add badge status on dom
      console.log('status update -> ', status);
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
    });
  }
}
