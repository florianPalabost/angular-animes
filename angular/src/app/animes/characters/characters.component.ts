import { Component, OnInit } from '@angular/core';
import {AnimesService} from '../../services/animes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  character: any;

  constructor(private animeService: AnimesService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.character = await this.animeService.retrieveCharacter(this.route.snapshot.params['characterName']);
    if (this.character.other_name !== '' && this.character.description !== '') {
      this.character.other_name = this.Utf8Decode(this.character.other_name);
      this.character.description = this.Utf8Decode(this.character.description);
    }
  }

  // fct to fix utf8 endoding pb with text import from api, found on @github
  Utf8Decode(strUtf) {
    // note: decode 2-byte chars last as decoded 2-byte strings could appear to be 3-byte or 4-byte char!
    return String(strUtf).replace(
      /[\u00f0-\u00f7][\u0080-\u00bf][\u0080-\u00bf][\u0080-\u00bf]/g,  // 4-byte chars
      function (c) {  // (note parentheses for precedence)
        // tslint:disable-next-line:no-bitwise
        const cc = ((c.charCodeAt(0) & 0x07) << 18) | ((c.charCodeAt(1) & 0x3f) << 12)
          // tslint:disable-next-line:no-bitwise
          | ((c.charCodeAt(2) & 0x3f) << 6) | ( c.charCodeAt(3) & 0x3f);
        const tmp = cc - 0x10000;
        // TODO: throw error(invalid utf8) if tmp > 0xfffff
        // tslint:disable-next-line:no-bitwise
        return String.fromCharCode(0xd800 + (tmp >> 10), 0xdc00 + (tmp & 0x3ff)); // surrogate pair
      }
    ).replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function (c) {  // (note parentheses for precedence)
        // tslint:disable-next-line:no-bitwise
        const cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | ( c.charCodeAt(2) & 0x3f);
        return String.fromCharCode(cc);
      }
    ).replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function (c) {  // (note parentheses for precedence)
        // tslint:disable-next-line:no-bitwise
        const cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
        return String.fromCharCode(cc);
      }
    );
  }

}
