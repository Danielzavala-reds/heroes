import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService){}

  ngOnInit(): void {
    this.getHeroes();
  }


  private getHeroes(){
    this.heroesService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
      })
  }

}
