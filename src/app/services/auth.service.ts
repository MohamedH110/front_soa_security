import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                   {"username":"mohamed","password":"123","roles":['USER']} ];*/
                   
                   
  private helper = new JwtHelperService();

  apiURL: string = 'http://localhost:8081/users';
  token!:string;
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!:string[];
  public regitredUser : User = new User();

  


  constructor(private router : Router,private http : HttpClient) { }

  login(user : User)
  {
  return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});

  }
 
 saveToken(jwt:string){
      localStorage.setItem('jwt',jwt);
      this.token = jwt;
      this.isloggedIn = true; 
      this.decodeJWT();
      console.log(jwt);
  }

  getToken():string {
    return this.token;
  }

  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  
  }

  loadToken() { 
    this.token = localStorage.getItem('jwt')!; 
    this.decodeJWT(); 
  } 
 








 /* SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  }  


  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token=undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }
  /*getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }
  */
  isTokenExpired(): Boolean
  {
    return  this.helper.isTokenExpired(this.token);   
  }

  registerUser(user :User){
    localStorage.removeItem('jwt'); 
    return this.http.post<User>(this.apiURL+'/register', user,{observe:'response'});
    }

    setRegistredUser(user : User){
      this.regitredUser=user;
      }
      
      getRegistredUser(){
      return this.regitredUser;
      }

      validateEmail(code : string){
        return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
        }
}
