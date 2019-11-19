import { Component, OnInit } from '@angular/core';
import { AnimesService } from 'src/app/services/animes.service';
import { ActivatedRoute } from '@angular/router';
import { Anime } from 'src/app/model/anime';

@Component({
  selector: 'app-animes-detail',
  templateUrl: './animes-detail.component.html',
  styleUrls: ['./animes-detail.component.scss']
})
export class AnimesDetailComponent implements OnInit {
  anime: Anime = new Anime;

  constructor(private route: ActivatedRoute, private animesService: AnimesService) { }

  ngOnInit() {
    this.retriveAnimeByName(this.route.snapshot.params['name']);
  }

  retriveAnimeByName = (name) => {
    this.animesService.findAnimeByName(name).subscribe(data => {
      this.anime = data;
    });

  }

}
