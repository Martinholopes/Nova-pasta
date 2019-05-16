import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ClientOperator } from '../models/client-operator';
import { MessageService } from './message.service';

/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/

@Injectable({ providedIn: 'root' })
  
export class OperatorService {
  
  private operatorUrl = 'api/operators';  // URL to web api
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
      
  getOperator(): Observable<ClientOperator[]> {
    return this.http.get<ClientOperator[]>(this.operatorUrl)
    .pipe(
    tap(_ => this.log('fetched Operator')),
    catchError(this.handleError<ClientOperator[]>('getOperator', []))
    );
  }

  getClientNo404<Data>(id: number): Observable<ClientOperator> {
    const url = `${this.operatorUrl}/?id=${id}`;
    return this.http.get<ClientOperator[]>(url)
      .pipe(
        map(clients => clients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} client Process number=${id}`);
        }),
        catchError(this.handleError<ClientOperator>(`ClientOperator Process number=${id}`))
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
    this.messageService.add(`OperatorService: ${message}`);
  }
}