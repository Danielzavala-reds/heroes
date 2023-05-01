import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-page',
  templateUrl: './heroe-page.component.html',
  styleUrls: ['./heroe-page.component.scss']
})
export class HeroePageComponent implements OnInit{

  hero?: Heroe

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.extractId();
  }


  back(){
    this.router.navigateByUrl('heroes/list')
  }
  
  private extractId (){
    this.activatedRoute.params
      .pipe(
        // delay(1000),
        switchMap( ({id}) => this.heroesService.getHeroe(id) )
      )
      .subscribe( hero => {
        if(!hero) return this.router.navigate(['/heroes/list'])

        this.hero = hero;

        console.log({hero})
        return;
      } )
  }

}
