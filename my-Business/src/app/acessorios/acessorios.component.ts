import { Component, OnInit } from '@angular/core';

import { Acessorio } from '../models/accessory';
import { ACESSORIO } from '../Lists/list-acessorios';

import { AcessoriosService } from '../service/acessorios.service';

@Component({
  selector: 'app-acessorios',
  templateUrl: './acessorios.component.html',
  styleUrls: ['./acessorios.component.css']
})
export class AcessoriosComponent implements OnInit {
  acessorio: Acessorio[];

  filteredAcessorios: Acessorio[] = [];
  selectedAcessorio = Acessorio;
  acessorios = ACESSORIO;
  selectedAces = '';

  constructor( private acessoriosService: AcessoriosService) { }

  ngOnInit() {
    this.getAcessorios();
  }

  getAcessorios(): void {
    this.acessoriosService.getAcessorios()
    .subscribe(acessorio => this.acessorio = acessorio);
  }

}
