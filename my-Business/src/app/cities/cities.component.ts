import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientService }  from '../service/clients.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  clients: Client[] = [];

  filteredClient: Client[] = [];
  selectedCitie = '';
  cities = [];
  selectedHome = '';

  constructor(private clientsservice: ClientService) { }

  ngOnInit() {
    this.gethome();
  }

  gethome(): void {
    this.clientsservice.gethome()
    .subscribe(response => {
      this.clients = response;
      this.filteredClient = this.clients;
      this.clients.forEach( Client =>{
        if(!this.cities.includes(Client.home)) {
          this.cities.push(Client.home)
        }
      });
      console.log( this.cities);
      console.log( this.filteredClient);
    });
  }

  getcidade(home): void {
    this.selectedCitie = home;
    this.filteredClient = this.clients.filter(Client => {
      return Client.home === this.selectedCitie;
    });
  }

  onHomeSelction(home) {
    console.log('onHomeSelction', home);
    this.selectedCitie = home;
    this.filteredClient = this.clients.filter(Client => {
      return Client.home === this.selectedCitie;
    })
  }
}
