import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(`${localStorage.getItem("currentUser")}`));
      this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loggedIn(){
    return !!localStorage.getItem('currentUser');
  }

  public login(form = {}){

    return this.http.post(environment.basicUrl + 'auth/signin',form
      , {
        responseType: "json",
        }).pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
      }));;

  }

  public register(form = {}){

    return this.http.post(environment.basicUrl + 'auth/signup',form
      , {
        responseType: "json",
        });

  }
}
