import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Focus } from 'src/app/Models/Focus/focus';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FocusService {

  // Define la URL base de la API
  private baseUrl = `${environment.apiUrl}/Focus`;

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
  getFocus(focus:object, page:number): Observable<Focus[]> {
    this.getLocalStorage();
    return this.httpClient.post<Focus[]>(`${this.baseUrl}/Index?page=${page}`, focus, this.httpOptions);
  }
  // Método para almacenar una nueva campaña
  storeFocus(focus:Focus): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post(`${this.baseUrl}/Store`, focus, this.httpOptions);
  }
  // Método para actualizar una campaña existente por su ID
  updateFocus(focus:Focus, id:number):Observable<Object>{
    this.getLocalStorage();
    return this.httpClient.put(`${this.baseUrl}/Update/${id}`, focus, this.httpOptions);
  }
  // Método para eliminar una campaña
  deleteFocus(focus:Focus):Observable<Object>{
    this.getLocalStorage();
    // Configura el cuerpo de la solicitud con la campaña en formato JSON
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.body = JSON.stringify(focus);
    return this.httpClient.delete(`${this.baseUrl}/Delete`, this.httpOptions);
  }
}
