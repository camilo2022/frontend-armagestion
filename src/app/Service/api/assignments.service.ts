import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignments } from 'src/app/Models/Assignment/assignments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  // Define la URL base de la API

   private baseUrl = `${environment.apiUrl}/Assignments`;

   // Obtiene el token almacenado en localStorage
  token:any = localStorage.getItem('token');

  // Define las opciones HTTP con el token y el tipo de contenido
  httpOptions: { headers: any, body: any };

  // Constructor del servicio
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

  // Método para obtener una lista de campañas paginadas
  getAssignments(assignments:object, page:number): Observable<Assignments[]> {
    this.getLocalStorage();
    return this.httpClient.post<Assignments[]>(`${this.baseUrl}/Index?page=${page}`, assignments, this.httpOptions);
  }
}
