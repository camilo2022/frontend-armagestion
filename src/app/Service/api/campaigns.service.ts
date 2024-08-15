import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaigns } from 'src/app/Models/Campaing/campaigns';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  // Define la URL base de la API
    private baseUrl = `${environment.apiUrl}/Campaigns`;  

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
  getCampaigns(campaigns:object, page:number): Observable<Campaigns[]> {
    this.getLocalStorage();
    return this.httpClient.post<Campaigns[]>(`${this.baseUrl}/Index?page=${page}`, campaigns, this.httpOptions);
  }
  // Método para almacenar una nueva campaña
  storeCampaigns(campaigns:Campaigns): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post(`${this.baseUrl}/Store`, campaigns, this.httpOptions);
  }
  // Método para actualizar una campaña existente por su ID
  updateCampaigns(campaigns:Campaigns, id:number):Observable<Object>{
    this.getLocalStorage();
    return this.httpClient.put(`${this.baseUrl}/Update/${id}`, campaigns, this.httpOptions);
  }
  // Método para eliminar una campaña
  deleteCampaigns(campaigns:Campaigns):Observable<Object>{
    this.getLocalStorage();
    // Configura el cuerpo de la solicitud con la campaña en formato JSON
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.body = JSON.stringify(campaigns);
    return this.httpClient.delete(`${this.baseUrl}/Delete`, this.httpOptions);
  }
}
