import { Component, OnInit, Input  } from '@angular/core';
import { Client } from '../client';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ClientService }  from '../clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client: Client;

  constructor(
    private route: ActivatedRoute,
    private ClientService: ClientService,
    private location: Location) { }

  ngOnInit() {
    this.getClient();
  }

  getClient(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ClientService.getClient(id)
      .subscribe(client => this.client = client);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.ClientService.updateClient(this.client)
      .subscribe(() => this.goBack());
  }
}
