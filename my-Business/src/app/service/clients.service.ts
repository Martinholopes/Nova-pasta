import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Client } from '../models/client';
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

  /** GET client by id. Will 404 if id not found */
  getClient(id: number): Observable<Client> {
    const url = `${this.clientUrl}/${id}`;
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched Process number=${id}`)),
      catchError(this.handleError<Client>(`getClient Process number=${id}`))
    );
  }

  getClientNo404<Data>(id: number): Observable<Client> {
    const url = `${this.clientUrl}/?id=${id}`;
    return this.http.get<Client[]>(url)
      .pipe(
        map(clients => clients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} client Process number=${id}`);
        }),
        catchError(this.handleError<Client>(`getClient Process number=${id}`))
      );
  }

  /** Add a new client to the server */
  addClient (client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientUrl, client, httpOptions).pipe(
      tap((newClient: Client) => this.log(`added client w/ id=${newClient.id}`)),
      catchError(this.handleError<Client>('addClient'))
    );
  }

  
  gethome(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl)
    .pipe(
      tap(_ => this.log('fetched home')),
      catchError(this.handleError<Client[]>('gethome', []))
    );
  }

  /*DELETE */
  deleteClient (client: Client | number): Observable<Client> {
    const id = typeof client === 'number' ? client : client.id;
    const url = `${this.clientUrl}/${id}`;

    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted client id=${id}`)),
      catchError(this.handleError<Client>('deleteClient'))
    );
  }

  updateClient (client: Client): Observable<any> {
    return this.http.put(this.clientUrl, client, httpOptions).pipe(
      tap(_ => this.log(`updated client id=${client.id}`)),
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