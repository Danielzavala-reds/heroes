import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.scss']
})
export class NewHeroPageComponent implements OnInit{

 myForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
 })

 publishers = [
   { id: 'DC Comics', value: 'DC-Comics' },
   { id: 'Marvel Comics', value: 'Marvel Comics' }
  ]
  
  constructor(private heroesService: HeroesService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog){}


  ngOnInit(): void {
    this.extractId();
  }
    
  get currentHero(): Heroe {
    /* Convertimos el valor del formulario a tipo Heroe */
    const hero = this.myForm.value as Heroe;

    return hero;
  }

  onSubmit():void {
    // console.log({
    //   formIsValid: this.myForm.valid,
    //   value: this.myForm.value,
    // })

    if(this.myForm.invalid) return;

    if(this.currentHero.id){
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          // TODO: mostrar snackbar
          this.showSnackBar(`${hero.superhero} actualizado!`)
        });

        return;
    };

    this.heroesService.postHero(this.currentHero)
      .subscribe( hero => {
        // TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackBar(`${hero.superhero} héroe creado!`)
      });

    /* Si pasamos como parametro el valor del formulario nos marca que no son tipos compatibles, ya que es como si estuvieramos 
    mandando algo muy parecido al tipo Heroe pero no es exactamente un tipo Heroe */
    // this.heroesService.updateHero(this.myForm.value)

  }

  confirmDelete(){
    if (!this.currentHero.id) throw Error ('Hero id is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.myForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((res:boolean) => res ),
        // tap (resDeleted => console.log({resDeleted})),
        switchMap( () => this.heroesService.deleteHero(this.currentHero.id) ),
        filter ((resDeleted: boolean) => resDeleted ),
      )
    .subscribe(res => {
      // console.log({res})  
      this.router.navigate(['/heroes'])
    });
    // // console.log('The dialog was closed');
    // // console.log({result})
    // if(!result) return;
    
    // this.heroesService.deleteHero(this.currentHero.id)
    // .subscribe( resDelete => {
    //   if(resDelete)
    //   this.router.navigate(['/heroes'])
    // });
    
  }

  showSnackBar(msg: string):void {
    this.snackbar.open( msg, 'Hecho', {
        duration: 2500,
    } )
  }

  private extractId (){
   if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroe( id ) ),
      ).subscribe( hero => {
        
        if(!hero) return this.router.navigateByUrl('/')

        this.myForm.reset( hero );
        return;
      })

  }

}
