import { Component, OnInit } from '@angular/core';
import { eleve } from '../model/eleve.model';
import { EleveService } from '../services/eleve.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrl: './recherche-par-nom.component.css'
})
export class RechercheParNomComponent  implements OnInit {

  nomeleve! : string;
  eleves!: eleve[];
  alleleves!: eleve[];
  searchTerm!: string;

  constructor(private eleveService : EleveService,public authService: AuthService) { }

  ngOnInit(): void {
    this.eleveService.listeeleves().subscribe(prods => {
      console.log(prods);
      this.eleves = prods;
      });
      
  }

  rechercherEleves(){
    this.eleveService.rechercherParNom(this.nomeleve).
    subscribe(prods => {
      console.log(prods);
      this.eleves=prods;});
  }

  onKeyUp(filterText : string){
    this.eleves = this.alleleves.filter(item =>
    item.nom.toLowerCase().includes(filterText));
    }

    

    supprimereleve(e: eleve){

      let conf = confirm("Etes-vous sûr ?");
       if (conf)
          this.eleveService.supprimereleve(e.id).subscribe(() => {
          console.log("eleve supprimé");
           
        
  
        });}
}
