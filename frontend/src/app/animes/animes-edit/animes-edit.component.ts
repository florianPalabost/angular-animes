import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnimesService} from '../../services/animes.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Anime} from '../../model/anime';

@Component({
  selector: 'app-animes-edit',
  templateUrl: './animes-edit.component.html',
  styleUrls: ['./animes-edit.component.scss']
})
export class AnimesEditComponent implements OnInit {
  animeForm: FormGroup;
  anime: Anime = new Anime;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private animesService: AnimesService,
              private sanitize: DomSanitizer,
              private formBuilder: FormBuilder) { this.createForm();}

  ngOnInit() {
    this.retriveAnimeByName(this.route.snapshot.params['name']);
  }

  createForm = () => {
    this.animeForm = this.formBuilder.group({
      title: ['', Validators.required ],
      synopsis: '',
      rating: '',
      startDate: '',
      endDate: '',
      status: '',
      nbEpisode: '',
      episodeLength: '',
      ytVideoID: '',
      subtype: '',
    });
  }

  retriveAnimeByName = (name) => {
    this.subscription = this.animesService.findAnimeByName(name).subscribe(data => {
      this.anime = data;
    });

  }

  updateAnime = (anime) => {
    console.log('call update anime with : ', anime);
  }
}
