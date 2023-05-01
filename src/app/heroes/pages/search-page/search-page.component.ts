import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  
  searchInput = new FormControl('');

  heroes: Heroe[] = [];

  selectedHero?: Heroe;


  constructor(private heroesService: HeroesService){}
  
  ngOnInit(): void {
   
  }

  searchHero(){
    const value: string = this.searchInput.value || '';
    
    this.heroesService.getSuggestions(value)
      .subscribe( heroes => {
        this.heroes = heroes;
      } )

  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void{
    console.log(event.option.value)
    if( !event.option.value ){
      this.selectedHero = undefined;
      return;
    }

    const hero: Heroe = event.option.value;
    this.searchInput.setValue( hero.superhero );
    
    this.selectedHero = hero;

  }

}
