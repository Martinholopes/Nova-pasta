import { Component, OnInit } from '@angular/core';
import { Acessorio } from '../models/accessory';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AcessoriosService } from '../service/acessorios.service';

@Component({
  selector: 'app-acessorios-detail',
  templateUrl: './acessorios-detail.component.html',
  styleUrls: ['./acessorios-detail.component.css']
})
export class AcessoriosDetailComponent implements OnInit {
  acessorios: Acessorio;

  constructor(
    private route: ActivatedRoute,
    private acessoriosService: AcessoriosService,
    private location: Location) { }

  ngOnInit() {
    this.getAcessorio();
  }

  getAcessorio(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.acessoriosService.getAcessorio(id)
      .subscribe(acessorios => this.acessorios = acessorios);
  }

  goBack(): void {
    this.location.back();
  }
}
