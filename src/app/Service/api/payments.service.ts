import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payments } from 'src/app/Models/Payments/payments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private baseUrl = `${environment.apiUrl}/Payments`;
  
  token:any = localStorage.getItem('token');
  httpOptions: { headers: HttpHeaders, body: any } ;

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

  getPayments(payments:object, page:number): Observable<Payments[]> {
    this.getLocalStorage();
    return this.httpClient.post<Payments[]>(`${this.baseUrl}/Index?page=${page}`, payments, this.httpOptions);
  }

  storePayments(payments: Payments): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post<Object>(`${this.baseUrl}/Store`, payments, this.httpOptions);
  }

  uploadPayments(payments: FormData): Observable<Object> {
    
    this.getLocalStorage();

    const options = {
      headers: this.httpOptions.headers,
      body: this.httpOptions.body,
      timeout: 60000 // Tiempo máximo de espera en milisegundos (60 segundos)
    };

    return this.httpClient.post<Object>(`${this.baseUrl}/Upload`, payments, this.httpOptions);
  }

  updatePayments(id:number, payments: Payments): Observable<Object> {
    this.getLocalStorage();
    
    return this.httpClient.put<Object>(`${this.baseUrl}/Update/${id}`, payments, this.httpOptions);
  }

  deletePayments(payments: Payments): Observable<Object> {
    this.getLocalStorage();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.body = JSON.stringify(payments);
    return this.httpClient.delete(`${this.baseUrl}/Delete`, this.httpOptions);
  }
}
