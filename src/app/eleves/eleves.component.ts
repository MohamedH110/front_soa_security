import { Component, OnInit } from '@angular/core';
import { eleve } from '../model/eleve.model';
import { Image } from '../model/Image.model';
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
   
  

  /*chargereleves(){
    this.eleveService.listeeleves().subscribe(prods => {
      console.log(prods);
      this.eleves = prods;
      this.eleves.forEach((prod) => {
        prod.imageStr = 'data:' + prod.images[0].type + ';base64,' +  prod.images[0].image;
        });
      });
  }
  */




  chargereleves() {
    this.eleveService.listeeleves().subscribe({
      next: (prods) => {
        console.log(prods);
        this.eleves = prods;
        
        this.eleves.forEach((prod) => {
          if (prod.images && prod.images.length > 0) {
            // Use the first image as the display image
            prod.imageStr = 'data:' + prod.images[0].type + ';base64,' + prod.images[0].image;
          } 
        });
      },
      error: (error) => {
        console.error('Error loading eleves:', error);
        // You might want to show an error message to the user here
      }
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




