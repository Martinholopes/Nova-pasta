import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Acessorio } from '../models/accessory';

@Injectable({
  providedIn: 'root'
})

export class AcessoriosService {
  
  private accessoryUrl = "api/accessory";

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getAcessorios(): Observable<Acessorio[]> {
    return this.http.get<Acessorio[]>(this.accessoryUrl)
      .pipe(
        tap(_ => this.log('fetched Accessory')),
        catchError(this.handleError<Acessorio[]>('getAccessory', []))
      );
  }

  searchAcessory(term: string): Observable<Acessorio[]> {
    if(!term.trim()){

        return of([]);
    }
    return this.http.get<Acessorio[]>(`${this.accessoryUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found acessory matching "${term}"`)),
      catchError(this.handleError<Acessorio[]>('searchAcessory', []))
    );
  }

  /** GET client by id. Will 404 if id not found */
  getAcessorio(id: number): Observable<Acessorio> {
    const url = `${this.accessoryUrl}/${id}`;
    return this.http.get<Acessorio>(url).pipe(
      tap(_ => this.log(`fetched ID=${id}`)),
      catchError(this.handleError<Acessorio>(`getClient id=${id}`))
    );
  }

  getAcessorioNo404<Data>(id: number): Observable<Acessorio> {
    const url = `${this.accessoryUrl}/?id=${id}`;
    return this.http.get<Acessorio[]>(url)
      .pipe(
        map(acesssorio => acesssorio[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} 'acessorio ID=${id}`);
        }),
        catchError(this.handleError<Acessorio>(`getAcessorio ID=${id}`))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
    
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
    private log(message: string) {
    this.messageService.add(`AccessorryService: ${message}`);
  }
}
