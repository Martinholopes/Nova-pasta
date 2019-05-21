import { Component, OnInit } from '@angular/core';

import { OperatorService } from '../service/operator.service';
import { ClientService } from '../service/clients.service';

import { Operator } from '../models/client-operator';
import { Client } from '../models/client';


@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})

export class OperatorComponent implements OnInit {
  operators: Operator[] = [];
  clients: Client[] = [];
  filteredClient: Client[] = [];
  selectedOperator = ''

  constructor(
    private OperatorService: OperatorService,
    private ClientService: ClientService
    ) { }

  ngOnInit() {
    this.getOperators();
    this.getClients();
  }

  getOperators(): void {
    this.OperatorService.getOperators()
      .subscribe(response => this.operators = response);
  }

  getClients(): void {
    this.ClientService.getClients()
      .subscribe(response => this.clients = response);
  }

  selectOperator(name) {
    console.log(name);
    this.selectedOperator = name;
    this.filteredClient = this.clients.filter(clients => {
      return clients.operadora === this.selectedOperator;
    });
  }
}
