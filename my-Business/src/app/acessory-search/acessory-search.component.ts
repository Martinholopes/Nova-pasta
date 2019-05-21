import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Acessorio } from '../models/accessory';
import { AcessoriosService } from '../service/acessorios.service';

@Component({
  selector: 'app-acessory-search',
  templateUrl: './acessory-search.component.html',
  styleUrls: ['./acessory-search.component.css']
})
export class AcessorySearchComponent implements OnInit {
  acessorios$: Observable<Acessorio[]>;
  private searchTerms = new Subject<string>();

  constructor( private acessoriosservice: AcessoriosService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.acessorios$ = this.searchTerms.pipe(

      distinctUntilChanged(),

      switchMap((term: string) => this.acessoriosservice.searchAcessory(term)),
    )
  }
}
