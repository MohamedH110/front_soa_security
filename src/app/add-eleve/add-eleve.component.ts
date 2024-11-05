import { Component, OnInit } from '@angular/core';
import { eleve } from '../model/eleve.model';
import { EleveService } from '../services/eleve.service';
import { Ecole } from '../model/ecole.model';
import { Router } from '@angular/router';
import { ecolewarpper } from '../model/ecolewarpper';

@Component({
  selector: 'app-add-eleve',
  templateUrl: './add-eleve.component.html',
  styleUrls: ['./add-eleve.component.css']
})
export class AddEleveComponent implements OnInit {
  newEleve = new eleve();
  newEcole!: Ecole;
  ecoles!: Ecole[];
  newIdEco!: number;

  constructor(private eleveService: EleveService, private router: Router) { }

  ngOnInit(): void {

    this.eleveService.listeecoles().
          subscribe(cats => {this.ecoles = cats._embedded.ecoles;
            console.log(cats);
        });
    
  }

  
  addeleve(){
    this.newEleve.ecole = this.ecoles.find(cat => cat.id == this.newIdEco)!;
    this.eleveService.ajoutereleve(this.newEleve)
                      .subscribe(prod => {
                      console.log(prod);
                      this.router.navigate(['eleves']);
                      }); 
    }
}
