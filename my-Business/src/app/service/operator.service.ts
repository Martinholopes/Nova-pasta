import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Operator } from '../models/client-operator';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
  
export class OperatorService {
  
  private operatorUrl = 'api/operators';  // URL to web api
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
      
  getOperators(): Observable<Operator[]> {
    return this.http.get<Operator[]>(this.operatorUrl)
    .pipe(
    tap(_ => this.log('fetched Operator')),
    catchError(this.handleError<Operator[]>('getOperator', []))
    );
  }

  /** GET client by id. Will 404 if id not found */
  getOperator(id: number): Observable<Operator> {
    const url = `${this.operatorUrl}/${id}`;
    return this.http.get<Operator>(url).pipe(
      tap(_ => this.log(`fetched id=${id}`)),
      catchError(this.handleError<Operator>(`getOperator id=${id}`))
    );
  }

  updateOperator (operator: Operator): Observable<any> {
    return this.http.put(this.operatorUrl, operator, httpOptions).pipe(
      tap(_ => this.log(`updated operator id=${operator.id}`)),
      catchError(this.handleError<any>('updateOperator'))
    );
  }

  addOperator (operator: Operator): Observable<Operator> {
    return this.http.post<Operator>(this.operatorUrl, operator, httpOptions).pipe(
      tap((newOperator: Operator) => this.log(`added operator w/ id=${newOperator.id}`)),
      catchError(this.handleError<Operator>('addOperator'))
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