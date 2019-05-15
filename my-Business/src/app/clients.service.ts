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

  /** GET client by id. Will 404 if id not found */
  getClient(id: number): Observable<Client> {
    const url = `${this.clientUrl}/${id}`;
    return this.http.get<Client>(url).pipe(
      tap(_ => this.log(`fetched Process number=${id}`)),
      catchError(this.handleError<Client>(`getClient Process number=${id}`))
    );
  }

  getHeroNo404<Data>(num_processo: number): Observable<Client> {
    const url = `${this.clientUrl}/?num_processo=${num_processo}`;
    return this.http.get<Client[]>(url)
      .pipe(
        map(clients => clients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} client Process number=${num_processo}`);
        }),
        catchError(this.handleError<Client>(`getClient Process number=${num_processo}`))
      );
  }

  /* GET client whose name contains search term */
  searchClients(term: string): Observable<Client[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Client[]>(`${this.clientUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found clients matching "${term}"`)),
      catchError(this.handleError<Client[]>('searchClients', []))
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