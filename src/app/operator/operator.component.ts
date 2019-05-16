import { Component, OnInit } from '@angular/core';

import { OperatorService } from '../service/operator.service';
import { ClientOperator } from '../models/client-operator';


@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})

export class OperatorComponent implements OnInit {
  clientoperator: ClientOperator[] = [];
  filteredOperator: ClientOperator[] = [];
  selectedOperator = ''

  constructor(private OperatorService: OperatorService) { }

  ngOnInit() {
    this.getOperator();
  }

  getOperator(): void {
    this.OperatorService.getOperator()
      .subscribe(response => this.clientoperator = response);
  }

  selectOperator(name) {
    this.selectedOperator = name;
    this.filteredOperator = this.clientoperator.filter(clientoperator => {
      return clientoperator.name === this.selectedOperator;
    });
  }
}
