import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {last, tap} from 'rxjs/operators';
import * as _ from 'underscore';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss']
})
export class AnimesListComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-trailing-whitespace
  private subscription: Subscription;
  animes: any = [];
  // animes = new BehaviorSubject([]);
  finished = false;
  batch = 0;
  lastKey = '';


  constructor(private route: ActivatedRoute, private animesService: AnimesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (this.route.snapshot.params['q']) {
      this.animesService.findAnimesLikeAll(this.route.snapshot.params['q']).subscribe(data => {
        console.log('data get from search : ', data);
        this.animes = data;
      });
      console.log('hoka');
    } else {
      this.spinner.show();
      this.findAllAnimes();
    }
  }

  findAllAnimes = (): void  => {
    this.subscription = this.animesService.retrieveAnimes(this.batch, this.lastKey).subscribe(data => {
      // concat to animes the data loaded
      this.animes = [...this.animes, ...data];
      this.spinner.hide();
      this.batch += 10;
    });
  }

  ngOnDestroy(): void {
    console.log('unsubscribe list animes');
    this.subscription.unsubscribe();
  }

  onScroll = () => {
    console.log('scrolled');
    this.spinner.show();
    this.findAllAnimes();
  }

}
