import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss']
})
export class AnimesListComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-trailing-whitespace
  private subscription: Subscription;
  animes: any = [];

  constructor(private animesService: AnimesService) { }

  ngOnInit() {
    this.findAllAnimes();
  }

  findAllAnimes = (): void  => {
    this.subscription = this.animesService.retrieveAllAnimes().subscribe(data => {
      // console.log('animes:::', data);
      this.animes = data;
    });
  }

  ngOnDestroy(): void {
    console.log('unsubscribe');
    this.subscription.unsubscribe();
  }

}
