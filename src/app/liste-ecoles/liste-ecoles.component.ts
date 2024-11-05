import { Component } from '@angular/core';
import { Ecole } from '../model/ecole.model';
import { EleveService } from '../services/eleve.service';

@Component({
  selector: 'app-liste-ecoles',
  templateUrl: './liste-ecoles.component.html',
  styleUrls: ['./liste-ecoles.component.css']
})
export class ListeEcolesComponent {

  ecoles!: Ecole[];
  updatedEco: Ecole = { id: 0, nom: "", adresse: "" };
  ajout: boolean = true;

  constructor(private eleveService: EleveService) { }

  ngOnInit(): void {
    this.chargerEcoles();
  }

  chargerEcoles() {
    this.eleveService.listeecoles().subscribe(cats => {
      this.ecoles = cats._embedded.ecoles;
      console.log(cats);
    });
  }

  updateEco(eco: Ecole) {
    this.updatedEco = Object.assign({}, eco); // Faire une copie
    this.ajout = false;
  }

  ecoleUpdated(e: Ecole) {
  
      this.eleveService.ajouterecole(e).subscribe(() => this.chargerEcoles());
    
  }

  supprimerEcole(eco: Ecole) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.eleveService.supprimerecole(eco.id).subscribe(() => {
        console.log("Ecole supprimée");
        this.chargerEcoles();
      });
    }
  }
}
