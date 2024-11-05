import { Component, OnInit } from '@angular/core';
import { eleve } from '../model/eleve.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from '../services/eleve.service';
import { Ecole } from '../model/ecole.model';

@Component({
  selector: 'app-update-eleve',
  templateUrl: './update-eleve.component.html',
  styleUrl: './update-eleve.component.css'
})
export class UpdateEleveComponent  implements OnInit {


  
  currentEleve=new eleve() ;
  ecoles! : Ecole[];
  updatedECoId! : number;
  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private eleveService: EleveService) { }

 
              ngOnInit(): void {

                this.eleveService.listeecoles().
                subscribe(cats => {this.ecoles = cats._embedded.ecoles;
                console.log(cats);
                });
                
                this.eleveService.consulterEleve(this.activatedRoute.snapshot.params['id']).
                subscribe( e =>{ this.currentEleve = e; 
                this.updatedECoId =   this.currentEleve.ecole.id;
    
                 } ) ;
                
    
              }
              

 
  updateeleve() {    
  this.currentEleve.ecole = this.ecoles.find(cat => cat.id == this.updatedECoId)!;
   this.eleveService.updateeleve(this.currentEleve).subscribe(e => {
   this.router.navigate(['eleves']); }
   );
   
  }
  
 
  

}
