import {Component, OnDestroy, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {AnimesService} from '../services/animes.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import * as _ from 'underscore';
import {DashboardService} from '../services/dashboard.service';
import {UsersService} from '../services/users.service';
import {User} from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  nbAnimes;
  animes;
  genresLabel = [];
  genresValue = [];
  categoriesLabel = [];
  categoriesValues = [];
  chart = [];
  chart_cat = [];
  genreData = [];
  catData = [];
  finalTopGenres = [];
  nbGenres: number;
  nbCats: number;
  // todo nbPerso back & front
  nbPersos;
  user: User;
  allAnimes;
  nbEpisodes = 0;
  allTimeSpent = 0;

  constructor(private animeService: AnimesService,
              private spinner: NgxSpinnerService,
              private dashService: DashboardService,
              private userService: UsersService
  ) { }

  async ngOnInit() {
    await this.spinner.show();
    this.user = await this.userService.currentUserValue;

    switch (this.user['user'].role) {
      case 'admin':
        this.nbPersos = await this.retrieveNbCharacters();
        this.animes = await this.findAllAnimes();

        break;
      default:
        this.nbPersos = 0;
        this.allAnimes = await this.findAnimesCompletedByUser(this.user['user'].id);
        this.animes = [];
        for (let i = 0; i < Object.keys(this.allAnimes['completed']).length; i++) {
          this.animes.push(this.allAnimes['completed'][i].anime);
          this.nbEpisodes += this.allAnimes['completed'][i].anime.nbEpisode;
          this.allTimeSpent += (this.allAnimes['completed'][i].anime.nbEpisode * this.allAnimes['completed'][i].anime.episodeLength);
        }
        this.allTimeSpent = Math.round(this.allTimeSpent / 60);
        break;
    }

    console.log('animes', this.animes);
    await this.createCatAndGenresChart(this.animes);

  }

  findAllAnimes = async ()  => {
    return await this.animeService.retrieveAllAnimes();
  }

  createCatAndGenresChart = (animes: any) => {
    this.nbAnimes = Object.keys(animes).length;
    _.each(animes, (anime) => {

      _.each(anime['categories'], (cat) => {
        if (!this.categoriesLabel.includes(cat['name'])) {
          this.categoriesLabel.push(cat['name']);
          this.categoriesValues[cat['name']] = 1;
        } else {
          this.categoriesValues[cat['name']]++;
        }
      });

      _.each(anime['genres'], (genre) => {
        if (!this.genresLabel.includes(genre['name'])) {
          this.genresLabel.push(genre['name']);
          this.genresValue[genre['name']] = 1;
        } else {
          this.genresValue[genre['name']]++;
        }
      });
    });
    console.log('this', this.genresValue);
    this.genresLabel = this.genresLabel.sort();
    // nom des genres classé top
    let toto = this.genresValue;
    toto = Object.keys(toto).sort(function(a, b) {return toto[b] - toto[a]; });
    console.log(toto);

    this.categoriesLabel = this.categoriesLabel.sort();
    this.nbGenres = Object.keys(this.genresValue).length;
    this.nbCats = Object.keys(this.categoriesValues).length;
    const colors = [];
    // tslint:disable-next-line:forin
    for (const genre in this.genresValue) {
      // console.log('val', this.genressValue[genre]);
      this.genreData.push(this.genresValue[genre]);
      // generate color random find in the web
      colors.push('#' + Math.random().toString(16).substr(2, 6));
    }
    const tata = this.genreData.sort((a, b) => b - a );

    _.each(toto, (g, i) => {
      const genr = {
        name: g,
        value: tata[i]
      };
      this.finalTopGenres.push(genr);
      // console.log( g, ' : ', tata[i] );
    });
    console.log(this.finalTopGenres);
    const colorsCat = [];
    // tslint:disable-next-line:forin
    for (const cat in this.categoriesValues) {
      // console.log('val', this.genresValue[genre]);
      this.catData.push(this.categoriesValues[cat]);
      colorsCat.push('#' + Math.random().toString(16).substr(2, 6));
    }

    const labels = this.finalTopGenres.map(x => x.name);

    this.chart = new Chart('canvas', {
      type: 'pie',
      options: {
        title: {
          display: true,
          text: 'Animes genres'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      },
      data: {
        labels: labels,
        datasets: [
          {
            data: this.genreData,
            borderColor: 'white',
            backgroundColor: colors,
            fill: true
          }
        ]
      },

    });

    console.log(this.categoriesLabel);
    console.log(this.catData);
    this.chart_cat = new Chart('canvas_cat', {
      type: 'pie',
      data: {
        labels: this.categoriesLabel,
        datasets: [
          {
            data: this.catData,
            borderColor: 'white',
            backgroundColor: colorsCat,
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Animes catégories'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });
    this.spinner.hide();
  }


  ngOnDestroy(): void {
    console.log('unsubscribe dashboard');
    // this.subscription.unsubscribe();
  }

  async retrieveNbCharacters() {
    return await this.animeService.retrieveNbCharacs();
  }

  async findAnimesCompletedByUser(idUser: any) {
    return await this.animeService.retrieveAnimesCompletedByUser(idUser);
  }
}
