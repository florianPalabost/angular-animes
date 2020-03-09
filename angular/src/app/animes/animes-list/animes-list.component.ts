import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {last, tap} from 'rxjs/operators';
import * as _ from 'underscore';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  genres: any = [];
  categories: any = [];
  formFilter: FormGroup;
  selectedGenres = [];
  dropdownGenresSettings = {};
  dropdownCategoriesSettings = {};

  constructor(private route: ActivatedRoute,
              private animesService: AnimesService,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['q']) {
      this.animesService.findAnimesLikeAll(this.route.snapshot.params['q']).subscribe(data => {
        console.log('data get from search : ', data);
        this.animes = data;
      });
    } else {
      // todo get all genres
      this.animesService.findAllGenres().subscribe(genres => {
        this.genres = genres;
        // debugger;
        this.dropdownGenresSettings = {
          singleSelection: false,
          idField: 'genre_id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 2,
          allowSearchFilter: true,
          // limitSelection: 2
        };
      });

      // get all categories
      this.animesService.findAllCategories().subscribe(categories => {
        this.categories = categories;

        this.dropdownCategoriesSettings = {
          singleSelection: false,
          idField: 'category_id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 2,
          allowSearchFilter: true,
          // limitSelection: 2
        };
      });
      // todo subtypes static

      this.formFilter = this.fb.group({
        status: '',
        genres: [],
        subtypes: [],
        categories: []
      });
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
    let isFilter = false;
    console.log('scrolled');
    console.log('form value : ', this.formFilter.value);

    // for not call other animes
    _.each(this.formFilter.value, (prop) => {
      if (prop) {
        console.log(prop);
        isFilter = true;
      }
    });
    if (!isFilter) {
      this.spinner.show();
      this.findAllAnimes();
    }
  }

  searchAnimes = (form) => {
    console.log('data from form :', form);
    this.spinner.show();
    // todo get all animes following filter with back call
    this.subscription = this.animesService.retrieveAnimesWithFilters(form).subscribe(data => {
      this.animes = data;
      this.spinner.hide();
    });

    // parcourt des animes to filter them following the different filters
    _.each(this.animes, (anime) => {
      if (form.status !== '') {
        if (anime['status'] !== form.status) {
          console.log('index : ', this.animes.indexOf(anime));
          this.animes.splice(this.animes.indexOf(anime));
        }
      }
    });
  }

}
