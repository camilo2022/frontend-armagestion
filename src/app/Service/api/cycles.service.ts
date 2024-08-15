import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cycles } from 'src/app/Models/Cycle/cycles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CyclesService {

  private baseUrl = `${environment.apiUrl}/Cycles`;
 
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

  getCycles(cycles:object, page:number): Observable<Cycles[]> {
    this.getLocalStorage();
    return this.httpClient.post<Cycles[]>(`${this.baseUrl}/Index?page=${page}`, cycles, this.httpOptions);
  }

  storeCycles(cycles:Cycles):Observable<Object>{
    this.getLocalStorage();
    return this.httpClient.post(`${this.baseUrl}/Store`, cycles, this.httpOptions);
  }

  updateCycles(cycles:Cycles, id:number):Observable<Object>{
    this.getLocalStorage();
    return this.httpClient.put(`${this.baseUrl}/Update/${id}`, cycles, this.httpOptions);
  }

  deleteCycles(cycles:Cycles):Observable<Object>{
    this.getLocalStorage();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.body = JSON.stringify(cycles);
    return this.httpClient.delete(`${this.baseUrl}/Delete`, this.httpOptions);
  }
}
