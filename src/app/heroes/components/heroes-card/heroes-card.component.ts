import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroes-card',
  templateUrl: './heroes-card.component.html',
  styleUrls: ['./heroes-card.component.scss']
})
export class HeroesCardComponent implements OnInit {

  @Input() hero!: Heroe;

  ngOnInit(): void {
    if( !this.hero ) throw Error ( 'Hero property is required' );
  }
}
