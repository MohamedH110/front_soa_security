import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ecole } from '../model/ecole.model';

@Component({
  selector: 'app-updateecole',
  templateUrl: './updateecole.component.html',
  styleUrl: './updateecole.component.css'
})
export class UpdateecoleComponent implements OnInit {

  @Input()
  ecole! : Ecole;

  @Input()
  ajout!:boolean;

  @Output() 
  ecoleUpdated = new EventEmitter<Ecole>();

  constructor() { }

  ngOnInit(): void {
    
  }

  saveEcole(){
    this.ecoleUpdated.emit(this.ecole);
  }

  modeAjout()
  {
    this.ajout=true;
    this.ecole.id = 0;
    this.ecole.nom="";
    this.ecole.adresse="";
  }
}
