import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssigUserConfiguration } from 'src/app/Models/AssigUserCongfigurations/assiguserconfigurations';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssiguserconfigurationService {

  private baseUrl = `${environment.apiUrl}/AssigUserConfiguration`;  

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

   // Método para obtener una lista de configuraciones paginadas
   getAssigUserConfiguration(assigUserConfiguration:object, page:number): Observable<AssigUserConfiguration[]> {
    this.getLocalStorage();
     return this.httpClient.post<AssigUserConfiguration[]>(`${this.baseUrl}/Index?page=${page}`, assigUserConfiguration, this.httpOptions);
    }

    storeAssigUserConfiguration(AssigUserConfiguration:AssigUserConfiguration): Observable<Object> {

      this.getLocalStorage();
      return this.httpClient.post(`${this.baseUrl}/Store`, AssigUserConfiguration, this.httpOptions);

    }


}
