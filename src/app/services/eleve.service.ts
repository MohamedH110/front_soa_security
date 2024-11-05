import { Injectable } from '@angular/core';
import { eleve } from '../model/eleve.model';
import { Ecole } from '../model/ecole.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ecolewarpper } from '../model/ecolewarpper';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})

export class EleveService {
  apiURL: string = 'http://localhost:8090/eleves/api';
  apiURLeco: string = 'http://localhost:8090/eleves/eco';
  eleves! : eleve[]; 
  ecoles: Ecole[];
  eleve!:eleve;
  
  constructor(private http : HttpClient, private authService : AuthService) {
    
   this.ecoles = [
      {id : 1, nom : "hedi chaker",adresse:"nabeul"},
      {id : 2, nom : "raoutha",adresse:"grombalia"},
      {id : 3, nom : "liberte",adresse:"gromnab"},
    ];

    /*this.eleves = [
      {id : 1, nom : "PC Asus",classe:"1ere", age: 6,ecole:{id : 1, nom : "hedi chaker",adresse:"nabeul"}},
      {id : 2, nom : "Imprimante Epson",classe:"2eme", age : 4,ecole:  {id : 2, nom : "raoutha",adresse:"grombalia"}},
      {id : 3, nom :"Tablette Samsung",classe:"1eme", age: 9,ecole:  {id : 3, nom : "liberte",adresse:"gromnab"}},
         ];
        
    */
   }



      
      listeeleves(): Observable<eleve[]>{
        /*let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
       */
         return this.http.get<eleve[]>(this.apiURL+"/all"/*,{headers:httpHeaders}*/);
    
        }

    
      
   
      
        ajoutereleve( e: eleve):Observable<eleve>{
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
            return this.http.post<eleve>(this.apiURL+"/addeleve", e, {headers:httpHeaders});
          }


      
  
          supprimereleve(id : number) {
            const url = `${this.apiURL}/deleleve/${id}`;
             let jwt = this.authService.getToken();
             jwt = "Bearer "+jwt;
             let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
               return this.http.delete(url,  {headers:httpHeaders});
             }

      
        
      
        

          consulterEleve(id: number): Observable<eleve> {
            const url = `${this.apiURL}/getbyid/${id}`;
            console.log(url);
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
              return this.http.get<eleve>(url,{headers:httpHeaders});
            }


          
          


          updateeleve(e :eleve) : Observable<eleve>    {
            console.log("eleve "+e);
             console.log(e.ecole);
               let jwt = this.authService.getToken();
               jwt = "Bearer "+jwt;
               let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
                 return this.http.put<eleve>(this.apiURL+"/updeleve", e, {headers:httpHeaders});
               }
         
          

          trierEleves(){
            this.eleves = this.eleves.sort((n1,n2) => {
            if (n1.id! > n2.id!) {
               return 1;
            }
            if (n1.id! < n2.id!) {
                return -1;
            }
               return 0;
             });
            }


             

            

          listeecoles():Observable<ecolewarpper>{
            let jwt = this.authService.getToken();
            jwt = "Bearer "+jwt;
            let httpHeaders = new HttpHeaders({"Authorization":jwt})
            return  this.http.get<ecolewarpper>(this.apiURLeco,{headers:httpHeaders});
            
                }     
          

          

           /* rechercherParEcole(idCat: number): Observable<eleve[]> {
                  const url = `${this.apiURL}/eleveco/${idCat}`;
                  let jwt = this.authService.getToken();
                  jwt = "Bearer "+jwt;
                  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
                  return this.http.get<eleve[]>(url, {headers:httpHeaders}); // Ajout du token JWT
              }*/

              rechercherParEcole(idCat: number): Observable<eleve[]> { 
                const url = `${this.apiURL}/eleveco/${idCat}`; 
                return this.http.get<eleve[]>(url); 
                }  

              rechercherParNom(nom: string): Observable<eleve[]> {
                const url = `${this.apiURL}/elevebynom/${nom}`;
                return this.http.get<eleve[]>(url);
            }

            
           
            ajouterecole( cat: Ecole):Observable<Ecole>{
              return this.http.post<Ecole>(this.apiURLeco, cat, httpOptions);
             }
        
             supprimerecole(id : number) {
              const url = `${this.apiURLeco}/${id}`;
              return this.http.delete(url, httpOptions);
              } 
              
            /*consulterEcole(id:number): Ecole{
              return this.ecoles.find(eco => eco.id == id)!;
              }
          */
    
}

