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

  async ngOnInit() {
    this.anime = await this.retriveAnimeByName(this.route.snapshot.params['name']);
    this.createForm();
    this.animeForm.setValue(this.anime);
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

  retriveAnimeByName = async (name) => {
    return await  this.animesService.findAnimeByName(name);
  }

  updateAnime = async (anime) => {
    console.log('call update anime with : ', anime);

    // todo call this.animesService to call backend endpoint
    await this.animesService.updateAnime(anime);
  }
}
