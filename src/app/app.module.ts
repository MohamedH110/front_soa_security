import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElevesComponent } from './eleves/eleves.component';
import { AddEleveComponent } from './add-eleve/add-eleve.component';
import { UpdateEleveComponent } from './update-eleve/update-eleve.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RechercheParEcoleComponent } from './recherche-par-ecole/recherche-par-ecole.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeEcolesComponent } from './liste-ecoles/liste-ecoles.component';
import { UpdateecoleComponent } from './updateecole/updateecole.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { tokenInterceptor } from './services/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ElevesComponent,
    AddEleveComponent,
    UpdateEleveComponent,
    RechercheParEcoleComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeEcolesComponent,
    UpdateecoleComponent,
    LoginComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch() // Enable fetch API
    ),
    { provide : HTTP_INTERCEPTORS,
      useClass : tokenInterceptor ,
      multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
