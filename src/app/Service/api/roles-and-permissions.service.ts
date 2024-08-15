import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesAndPermissions } from 'src/app/Models/RolesAndPermissions/roles-and-permissions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesAndPermissionsService {

  private baseUrl = `${environment.apiUrl}/RolesAndPermissions`;
  
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

  getRolesAndPermissions(rolesAndPermissions:object, page:number): Observable<RolesAndPermissions[]> {
    this.getLocalStorage();
    return this.httpClient.post<RolesAndPermissions[]>(`${this.baseUrl}/Index?page=${page}`, rolesAndPermissions, this.httpOptions);
  }

  storeRolesAndPermissions(rolesAndPermissions: RolesAndPermissions): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post<Object>(`${this.baseUrl}/Store`, rolesAndPermissions, this.httpOptions);
  }

  updateRolesAndPermissions(id:number, rolesAndPermissions: RolesAndPermissions): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.put<Object>(`${this.baseUrl}/Update/${id}`, rolesAndPermissions, this.httpOptions);
  }

  deleteRolesAndPermissions(rolesAndPermissions: object): Observable<Object> {
    this.getLocalStorage();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.body = JSON.stringify(rolesAndPermissions);
    return this.httpClient.delete(`${this.baseUrl}/Delete`, this.httpOptions);
  }

}
