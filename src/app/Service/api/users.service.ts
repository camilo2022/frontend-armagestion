import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'src/app/Models/User/users';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = `${environment.apiUrl}/Users`; 

  token:any = localStorage.getItem('token');
  httpOptions: { headers: any, body: any };

  constructor(private httpClient : HttpClient) { }

  getLocalStorage() : void {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
      body: null
    };
  }

  getUsers(users:object, page:number): Observable<Users[]> {
    this.getLocalStorage();
    return this.httpClient.post<Users[]>(`${this.baseUrl}/Index?page=${page}`, users, this.httpOptions);
  }

  getUsersInactives(users:object, page:number): Observable<Users[]> {
    this.getLocalStorage();
    return this.httpClient.post<Users[]>(`${this.baseUrl}/Inactives?page=${page}`, users, this.httpOptions);
  }

  storeUsers(users: Users): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post<Users>(`${this.baseUrl}/Store`, users, this.httpOptions);
  }

  updateUsers(id:number, users: Users): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.put<Users>(`${this.baseUrl}/Update/${id}`, users, this.httpOptions);
  }

  deleteUsers(users: Users): Observable<Object> {
    this.getLocalStorage();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.body = JSON.stringify(users);
    return this.httpClient.delete(`${this.baseUrl}/Delete`, this.httpOptions);
  }

  restoreUsers(users: Users): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.put<Users>(`${this.baseUrl}/Restore`, users, this.httpOptions);
  }

  assignRoleAndPermissionsUsers(users: Users): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post<Users>(`${this.baseUrl}/AssignRolePermissions`, users, this.httpOptions);
  }

  removeRoleAndPermissionsUsers(users: Users): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post<Users>(`${this.baseUrl}/RemoveRolePermissions`, users, this.httpOptions);
  }
}
