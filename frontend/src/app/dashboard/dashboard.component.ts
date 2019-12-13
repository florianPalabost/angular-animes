import {Component, OnDestroy, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {AnimesService} from '../services/animes.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import * as _ from 'underscore';
import {DashboardService} from '../services/dashboard.service';

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
  private subscription: Subscription;
  private nbGenres: number;
  private nbCats: number;
  // todo nbPerso back & front
  private nbPersos: number;

  constructor(private animeService: AnimesService,
              private spinner: NgxSpinnerService,
              private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.findAllAnimes();
  }

  findAllAnimes = (): void  => {
    this.subscription = this.animeService.retrieveAllAnimes().subscribe(data => {

     this.nbAnimes = Object.keys(data).length;
     _.each(data, (anime) => {

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
    });
  }

  ngOnDestroy(): void {
    console.log('unsubscribe dashboard');
    this.subscription.unsubscribe();
  }
}
