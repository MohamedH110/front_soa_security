import { Component, OnInit } from '@angular/core';
import { eleve } from '../model/eleve.model';
import { EleveService } from '../services/eleve.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrl: './eleves.component.css'
})
export class ElevesComponent implements OnInit{

  eleves : eleve[]; 
   constructor(private eleveService: EleveService,public authService: AuthService ) {
    this.eleves = [];
    }
    
  
  
   ngOnInit(): void {
    this.chargereleves();
    }
   
  

  chargereleves(){
    this.eleveService.listeeleves().subscribe(prods => {
      console.log(prods);
      this.eleves = prods;
      });
  }
  

  supprimereleve(e: eleve){

    let conf = confirm("Etes-vous sûr ?");
     if (conf)
        this.eleveService.supprimereleve(e.id).subscribe(() => {
        console.log("eleve supprimé");
        this.chargereleves();     
      

      });}


    }




