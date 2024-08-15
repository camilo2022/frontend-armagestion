import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { Login } from 'src/app/Models/User/login';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService{

  token:any = localStorage.getItem('token');
  id:any = localStorage.getItem('id');

  private baseUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient, private router:Router) { }

  LoginUser(loginUser:Login): Observable<Login> {
    return this.httpClient.post<Login>(`${this.baseUrl}/login`, loginUser);
  }

  loadUserRolesAndPermissions(id: any, token: any) : Observable<any> {
    const formData = {
      user_id: id,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpClient.post<any>(`${this.baseUrl}/RoleAndPermission`,formData,httpOptions);
  }

  Logout(){
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
    const routelogout = this.baseUrl + "/logout";
    const formData = {
      user_id: this.id,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    this.httpClient.post(routelogout,formData,httpOptions).subscribe(
      data => {

        localStorage.removeItem('token');
        localStorage.removeItem('id');

        this.router.navigate(['login']);
      },
      error => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');

        this.router.navigate(['login']);
      }
    );
  }
}
