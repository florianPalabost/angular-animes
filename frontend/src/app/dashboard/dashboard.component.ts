import {Component, OnDestroy, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {AnimesService} from '../services/animes.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import * as _ from 'underscore';

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
  private subscription: Subscription;
  private nbGenres: number;
  private nbCats: number;
  // todo nbPerso back & front
  private nbPersos: number;

  constructor(private animeService: AnimesService, private spinner: NgxSpinnerService) { }

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
    this.genresLabel = this.genresLabel.sort();
    this.genresValue = this.genresValue.sort();
    this.categoriesLabel = this.categoriesLabel.sort();
    this.nbGenres = Object.keys(this.genresValue).length
    this.nbCats = Object.keys(this.categoriesValues).length
      const colors = [];
      // tslint:disable-next-line:forin
      for (const genre in this.genresValue) {
        // console.log('val', this.genresValue[genre]);
        this.genreData.push(this.genresValue[genre]);
        // generate color random find in the web
        colors.push('#' + Math.random().toString(16).substr(2, 6));
      }
      const colorsCat = [];
      // tslint:disable-next-line:forin
      for (const cat in this.categoriesValues) {
        // console.log('val', this.genresValue[genre]);
        this.catData.push(this.categoriesValues[cat]);
        colorsCat.push('#' + Math.random().toString(16).substr(2, 6));
      }


      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: this.genresLabel,
          datasets: [
            {
              data: this.genreData,
              borderColor: 'white',
              backgroundColor: colors,
              fill: true
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Animes genres'
          },
          legend: {
            display: true
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
      this.chart_cat = new Chart('canvas_cat', {
        type: 'doughnut',
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
            display: true
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
