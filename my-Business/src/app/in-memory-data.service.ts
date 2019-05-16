import { Injectable } from '@angular/core';

import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const clients = [
      { id: 1, name: 'Suri', morada:'Mafra', cod_postal: 2640, marca: 'Iphone', operadora:'Meo'},
      { id: 2, name: 'Rodas', morada:'Ericeira', cod_postal: 2655, marca: 'Iphone', operadora:'Vodafone'},
      { id: 3, name: 'Piquenino', morada:'Sintra', cod_postal: 2710, marca: 'Huawei', operadora:'Nos'},
      { id: 4, name: 'Stonas', morada:'Mafra', cod_postal: 2640, marca: 'Huawei', operadora:'Nos'},
      { id: 5, name: 'Moura', morada:'Malveira', cod_postal: 2665, marca: 'Huawei', operadora:'Vodafone'},
      { id: 6, name: 'Estatua', morada:'Malveira', cod_postal: 2665, marca: 'LG', operadora:'Meo'},
      { id: 7, name: 'Lula', morada:'Ericeira', cod_postal: 2655, marca: 'Samsung', operadora:'Meo'},
      { id: 8, name: 'Caseiro', morada:'Ericeira', cod_postal: 2710, marca: 'Samsung', operadora:'Nos'},
      { id: 9, name: 'Rui', morada:'Mafra', cod_postal: 2640, marca: 'LG', operadora:'Vodafone'},
      { id: 10, name: 'Alex', morada:'Sintra', cod_postal: 2710, marca: 'Samsung', operadora:'Nos'},
      { id: 11, name: 'Joao', morada:'Ericeira', cod_postal: 2655, marca: 'Samsung', operadora:'Uzo'}
    ];
    return {clients};
  }

  genId(clients: Client[]): number {
    return clients.length > 0 ? Math.max(...clients.map(client => client.id)) + 1 : 11;
  }
}
