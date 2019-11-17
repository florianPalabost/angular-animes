import { Component, OnInit } from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';

@Component({
  selector: 'app-animes-list',
  templateUrl: './animes-list.component.html',
  styleUrls: ['./animes-list.component.scss']
})
export class AnimesListComponent implements OnInit {
  // tslint:disable-next-line:no-trailing-whitespace

  animes: any = [];

  constructor(private animesService: AnimesService) { }

  ngOnInit() {
    this.findAllAnimes();
  }

  findAllAnimes = (): void  => {
    this.animesService.retrieveAllAnimes().subscribe(data => {
      // console.log('animes:::', data);
      this.animes = data;
    });
  }

}
