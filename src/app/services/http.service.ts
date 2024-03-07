import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpService {
   private API_URL: string;

   constructor(private http: HttpClient) { 
      this.API_URL = "http://localhost:3000";
   }

   get<T>(url: string): Observable<T> {    
      const headers = new HttpHeaders();
      return this.http.get<T>(`${this.API_URL}/${url}`, {headers})
   }

   post<P, R>(url: string, body: P): Observable<R> {
      const headers = new HttpHeaders();
      return this.http.post<R>(`${this.API_URL}/${url}`, body, {headers});
   }
}