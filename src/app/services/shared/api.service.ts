import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string, params: HttpParams = new HttpParams(), headers = {}){
    return this.http.get(`${environment.baseUrl}${url}`, {params, headers, responseType: 'json'}).pipe(
        map(res => res)
      );
  }

  put(url, body = {}, params: HttpParams = new HttpParams(), headers = {}){
    return this.http.put(`${environment.baseUrl}${url}`, body, {params, headers}).pipe(
        map(res => res)
      );
  }

  post(url, body = {}, params: HttpParams = new HttpParams(), headers = {}){
    return this.http.post(`${environment.baseUrl}${url}`, body, {params, headers}).pipe(
        map(res => res)
      );
  }

  delete(url, headers = {}, params: HttpParams = new HttpParams()){
    return this.http.delete(`${environment.baseUrl}${url}`,{headers, params}).pipe(
        map(res => res)
      );
  }
}
