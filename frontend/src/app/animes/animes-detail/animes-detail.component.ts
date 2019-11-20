import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import { ActivatedRoute } from '@angular/router';
import { Anime } from 'src/app/model/anime';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-animes-detail',
  templateUrl: './animes-detail.component.html',
  styleUrls: ['./animes-detail.component.scss']
})
export class AnimesDetailComponent implements OnInit, OnDestroy {
  anime: Anime = new Anime;
  private subscription: Subscription;
  videoYT;
  tmpURL;

  constructor(private route: ActivatedRoute, private animesService: AnimesService, private sanitize: DomSanitizer) { }

  ngOnInit() {
    this.retriveAnimeByName(this.route.snapshot.params['name']);
  }

  ngOnDestroy(): void {
    console.log('unsubscribe detail');
    this.subscription.unsubscribe();
  }

  retriveAnimeByName = (name) => {
    this.subscription = this.animesService.findAnimeByName(name).subscribe(data => {
      this.anime = data;
      // To avoid XSS need tot use sanitize to create a "trust" ressource url !
      this.tmpURL = 'http://www.youtube.com/embed/' + this.anime.ytVideoID;
      this.videoYT = this.sanitize.bypassSecurityTrustResourceUrl( this.tmpURL);
    });

  }

}
