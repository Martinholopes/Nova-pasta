import { Component, OnInit } from '@angular/core';
import { Client } from '../client';

import { ClientService } from '../clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }
  
  getClients(): void {
    this.clientService.getClients()
    .subscribe(clients => this.clients = clients);
  }

  add(name: string, morada: string, cod_postal: number, marca: string, operadora: string) : void {

    name = name.trim();
    morada = morada.trim();
    marca = marca.trim();
    operadora = operadora.trim();

    const newClient: Client = {
      id: this.clients.length > 0 ? Math.max(...this.clients.map(client => client.id)) + 1 : 11,
      name: name,
      morada: morada,
      cod_postal: cod_postal,
      marca: marca,
      operadora: operadora,
    };

    if (!name) { return; } 
    this.clientService.addClient(newClient as Client)
      .subscribe(client => {
        this.clients.push(client);
      });
  }
 
  delete(client: Client): void {
    this.clients = this.clients.filter(h => h !== client);
    this.clientService.deleteClient(client).subscribe();
  }
 
}
