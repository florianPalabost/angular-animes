import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import { ActivatedRoute } from '@angular/router';
import { Anime } from 'src/app/model/anime';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import 'magnific-popup';

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

  currentUser: any;
  // @ViewChild('video') videoElement: ElementRef;

  constructor(private route: ActivatedRoute, private animesService: AnimesService, private sanitize: DomSanitizer) { }

  ngOnInit() {
     this.retriveAnimeByName(this.route.snapshot.params['name']);
      console.log('init');
      this.currentUser = localStorage.getItem('currentUser') !== null ? localStorage.getItem('currentUser')['role'] : null ;
  }

  ngOnDestroy(): void {
    console.log('unsubscribe detail');
    this.subscription.unsubscribe();
  }

  // ngAfterViewInit (): void {
  //   (<any>$('.magnific-youtube')).magnificPopup({
  //     items: {
  //       src: 'https://www.youtube.com/emfbed/' + this.anime.ytVideoID,
  //       type: 'iframe'
  //     },
  //     disableOn: 700,
  //     type: 'iframe',
  //     mainClass: 'mfp-fade',
  //     removalDelay: 300,
  //     preloader: false,
  //     fixedContentPos: false
  //   });
  // }


  retriveAnimeByName = async (name) => {
    this.subscription = await this.animesService.findAnimeByName(name).subscribe(data => {
      this.anime = data;
      if (this.anime.startDate) {
        this.anime.startDate = this.anime.startDate.split('-')[1] + '/' + this.anime.startDate.split('-')[0];
      }
      if (this.anime.endDate) {
        this.anime.endDate = this.anime.endDate.split('-')[1] + '/' + this.anime.endDate.split('-')[0];
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

}
