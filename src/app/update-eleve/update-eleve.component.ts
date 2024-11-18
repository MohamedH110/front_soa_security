import { Component, OnInit } from '@angular/core';
import { eleve } from '../model/eleve.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from '../services/eleve.service';
import { Ecole } from '../model/ecole.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-eleve',
  templateUrl: './update-eleve.component.html',
  styleUrl: './update-eleve.component.css'
})
export class UpdateEleveComponent  implements OnInit {


  
  currentEleve=new eleve() ;
  ecoles! : Ecole[];
  updatedECoId! : number;
  myImage! :string;

  uploadedImage!: File;
  isImageUpdated: Boolean=false;
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private eleveService: EleveService) { }

 
             
              ngOnInit(): void {
                this.eleveService.listeecoles().
                subscribe(cats => {this.ecoles = cats._embedded.ecoles;
                });
                this.eleveService.consulterEleve(this.activatedRoute.snapshot.params['id'])
                  .subscribe(prod => {
                    this.currentEleve = prod;
                    this.updatedECoId = prod.ecole.id;
                  }); 
                }
                
                  
               
               
               

 
  updateeleve() {    
  this.currentEleve.ecole = this.ecoles.find(cat => cat.id == this.updatedECoId)!;
   this.eleveService.updateeleve(this.currentEleve).subscribe(e => {
   this.router.navigate(['eleves']); }
   );
   
  }


  
  
  
  
  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageProduit(){
    this.eleveService
    .uploadImageEleve(this.uploadedImage,this.uploadedImage.name,this.currentEleve.id)
        .subscribe( (img : Image) => {
              this.currentEleve.images.push(img);
           });
  }


  
  

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.eleveService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images 
        const index = this.currentEleve.images.indexOf(img, 0);
        if (index > -1) {
          this.currentEleve.images.splice(index, 1);
        }
      });
  }
}
