import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElevesComponent } from './eleves/eleves.component';
import { AddEleveComponent } from './add-eleve/add-eleve.component';
import { UpdateEleveComponent } from './update-eleve/update-eleve.component';
import { RechercheParEcoleComponent } from './recherche-par-ecole/recherche-par-ecole.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeEcolesComponent } from './liste-ecoles/liste-ecoles.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { elvGuard } from './services/elv.guard';

const routes: Routes = [ 
  { path: "eleves", component: ElevesComponent },
  { path: "add-eleves", component: AddEleveComponent,canActivate:[elvGuard]} ,
  {path: "updateeleve/:id", component: UpdateEleveComponent},
  {path: "RechercheParEcole", component: RechercheParEcoleComponent},
  {path: "ListeEcolesComponent", component: ListeEcolesComponent},
  {path: "RechercheParNom", component: RechercheParNomComponent},
  {path: "login", component: LoginComponent},
  {path: "app-forbidden", component: ForbiddenComponent},
  { path: "", redirectTo: "eleves", pathMatch: "full" },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
