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
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.retriveAnimeByName(this.route.snapshot.params['name']);
    this.createForm();
  }

  createForm = () => {
    this.animeForm = this.formBuilder.group({
      id: '',
      idApi: '',
      linkApi: '',
      posterImage: '',
      coverImage: '',
      createdAt: '',
      updatedAt: '',
      genres: '',
      categories: '',
      subtype: '',
      characters: '',
      title: ['', Validators.required ],
      synopsis: '',
      rating: '',
      startDate: '',
      endDate: '',
      status: '',
      nbEpisode: '',
      episodeLength: '',
      ytVideoID: '',
    });
  }

  retriveAnimeByName = (name) => {
    this.subscription = this.animesService.findAnimeByName(name).subscribe(data => {
      this.anime = data;
      this.animeForm.setValue(data);
    });

  }

  updateAnime = async (anime) => {
    console.log('call update anime with : ', anime);

    // todo call this.animesService to call backend endpoint
    await this.animesService.updateAnime(anime);
  }
}
