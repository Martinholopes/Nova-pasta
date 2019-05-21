import { Component, OnInit } from '@angular/core';

import { Client } from '../models/client';
import { Operator } from '../models/client-operator';

import { ClientService } from '../service/clients.service';
import { OperatorService } from '../service/operator.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  operators: Operator[];
  
  constructor(
    private clientService: ClientService,
    private operatorService: OperatorService,
    ) { }

  ngOnInit() {
    this.getClients();
  }
  
  getClients(): void {
    this.clientService.getClients()
    .subscribe(clients => this.clients = clients);
  }

  add(name: string, home: string, cod_postal: number, marca: string, operadora: string) : void {

    name = name.trim();
    home = home.trim();
    marca = marca.trim();
    operadora = operadora.trim();

    const newClient: Client = {
      id: this.clients.length > 0 ? Math.max(...this.clients.map(client => client.id)) + 1 : 11,
      name: name,
      home: home,
      cod_postal: cod_postal,
      marca: marca,
      operadora: operadora,
    };

    if (!name) { return; } 
      this.clientService.addClient(newClient as Client)
        .subscribe(client => {
          this.clients.push(client);
    });

    const newOperator: Operator = {
      id: this.operators.length > 0 ? Math.max(...this.operators.map(operators => operators.id)) + 1 : 4,
      name: name,
    };

    if (!name) { return; } 
      this.operatorService.addOperator(newOperator as Operator)
        .subscribe(operator => {
          this.operators.push(operator);
    });
  }
 
  delete(client: Client): void {
    this.clients = this.clients.filter(h => h !== client);
    this.clientService.deleteClient(client).subscribe();
  }
 
}
