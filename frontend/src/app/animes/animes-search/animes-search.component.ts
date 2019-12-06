import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AnimesService } from 'src/app/services/animes.service';
import { $ } from 'protractor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animes-search',
  templateUrl: './animes-search.component.html',
  styleUrls: ['./animes-search.component.scss']
})
export class AnimesSearchComponent implements OnInit {
  // we need to do this to use icon font awesome ....
  faSearch = faSearch;
  animes: any = [];
  showDropDown = false;
  valueSearch;
  constructor(private animesService: AnimesService) { }

  ngOnInit() {

  }

  retrieveAnimesLike = (q: string) => {
    if (q.length > 2) {
      console.log('param search = ', q);
      this.animesService.findAnimesLike(q).subscribe(data => {
        console.log('data get from search : ', data);
        this.animes = data;
        this.valueSearch = q;
        this.showDropDown = !this.showDropDown;
      });
    }
  }

  hideDropDown = (event) => {
    console.log('need to hide dropfown');
    this.showDropDown = false;
  }
}
