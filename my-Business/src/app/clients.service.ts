import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Client } from './client';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class ClientService {

  private clientUrl = 'api/clients';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Clients from the server */
  getClients (): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl)
      .pipe(
        tap(_ => this.log('fetched Clients')),
        catchError(this.handleError<Client[]>('getClients', []))
      );
  }

  /** Add a new client to the server */
  addClient (client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientUrl, client, httpOptions).pipe(
      tap((newClient: Client) => this.log(`added client w/ num_processo=${newClient.num_processo}`)),
      catchError(this.handleError<Client>('addClient'))
    );
  }

  /*DELETE */
  deleteClient (hero: Client | number): Observable<Client> {
    const id = typeof hero === 'number' ? hero : hero.num_processo;
    const url = `${this.clientUrl}/${id}`;

    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted client num_processo=${id}`)),
      catchError(this.handleError<Client>('deleteClient'))
    );
  }

  updateClient (client: Client): Observable<any> {
    return this.http.put(this.clientUrl, client, httpOptions).pipe(
      tap(_ => this.log(`updated client id=${client.num_processo}`)),
      catchError(this.handleError<any>('updateClient'))
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
    this.messageService.add(`ClientService: ${message}`);
  }
}