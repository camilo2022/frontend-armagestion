import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationCampaigns } from 'src/app/Models/ConfigurationCampaign/configuration-campaigns';
import { PatternsTime } from 'src/app/Models/TimePatterns/Timepattern';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationCampaignsService {

  private baseUrl = `${environment.apiUrl}/ConfigurationCampaigns`;

  private baseUrl1 = `${environment.apiUrl}/TimePattern`;
  token:any = localStorage.getItem('token');
  httpOptions: { responseType: any, headers: any, body: any };

  constructor(private httpClient : HttpClient) { }

  getLocalStorage() : void {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      responseType: null,
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
      body: null
    };
  }

  getConfigurationCampaigns(configurationCampaigns:object, page:number): Observable<ConfigurationCampaigns[]> {
    this.getLocalStorage();
    return this.httpClient.post<ConfigurationCampaigns[]>(`${this.baseUrl}/Index?page=${page}`, configurationCampaigns, this.httpOptions);
  }

  storeConfigurationCampaigns(configurationCampaigns: ConfigurationCampaigns): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.post<ConfigurationCampaigns>(`${this.baseUrl}/Store`, configurationCampaigns, this.httpOptions);
  }

  updateConfigurationCampaigns(id:number, configurationCampaigns: ConfigurationCampaigns): Observable<Object> {
    this.getLocalStorage();
    return this.httpClient.put<ConfigurationCampaigns>(`${this.baseUrl}/Update/${id}`, configurationCampaigns, this.httpOptions);
  }

  deleteConfigurationCampaigns(configurationCampaigns: ConfigurationCampaigns): Observable<Object> {
    this.getLocalStorage();
    this.httpOptions.headers = this.httpOptions.headers.append('Content-Type', 'application/json');
    this.httpOptions.body = JSON.stringify(configurationCampaigns);
    return this.httpClient.delete(`${this.baseUrl}/Delete`, this.httpOptions);
  }

  downloadConfigurationCampaigns(dataConfigurationCampaing: any): Observable<any> {
    this.getLocalStorage();
    this.httpOptions.responseType = 'blob';
    return this.httpClient.post(`${environment.apiUrl}/Managements/Download`, dataConfigurationCampaing, this.httpOptions);
  }



updatePatternTime(id: number, data: any, field: string): Observable<any> {
  this.getLocalStorage();
  return this.httpClient.put(`${this.baseUrl1}/Update/${id}`, data, this.httpOptions);

}

  reloadPatternTime(id: number): Observable<Object> {
    const url = `${this.baseUrl1}/Default/${id}`;
    console.log(url);
    return this.httpClient.put(url, {}, this.httpOptions);
  }


}
