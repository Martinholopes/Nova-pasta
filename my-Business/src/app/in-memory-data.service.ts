import { Injectable } from '@angular/core';

import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const clients = [
      { num_processo: 1, name: 'Suri', morada:'Mafra', cod_postal: 2640, marca: 'Iphone', operadora:'Meo'},
      { num_processo: 2, name: 'Rodas', morada:'Ericeira', cod_postal: 2655, marca: 'Iphone', operadora:'Vodafone'},
      { num_processo: 3, name: 'Piquenino', morada:'Sintra', cod_postal: 2710, marca: 'Huawei', operadora:'Nos'},
      { num_processo: 4, name: 'Stonas', morada:'Mafra', cod_postal: 2640, marca: 'Huawei', operadora:'Nos'},
      { num_processo: 5, name: 'Moura', morada:'Malveira', cod_postal: 2665, marca: 'Huawei', operadora:'Vodafone'},
      { num_processo: 6, name: 'Estatua', morada:'Malveira', cod_postal: 2665, marca: 'LG', operadora:'Meo'},
      { num_processo: 7, name: 'Lula', morada:'Ericeira', cod_postal: 2655, marca: 'Samsung', operadora:'Meo'},
      { num_processo: 8, name: 'Caseiro', morada:'Ericeira', cod_postal: 2710, marca: 'Samsung', operadora:'Nos'},
      { num_processo: 9, name: 'Rui', morada:'Mafra', cod_postal: 2640, marca: 'LG', operadora:'Vodafone'},
      { num_processo: 10, name: 'Alex', morada:'Sintra', cod_postal: 2710, marca: 'Samsung', operadora:'Nos'},
      { num_processo: 11, name: 'Joao', morada:'Ericeira', cod_postal: 2655, marca: 'Samsung', operadora:'Uzo'}
    ];
    return {clients};
  }

  genId(clients: Client[]): number {
    return clients.length > 0 ? Math.max(...clients.map(client => client.num_processo)) + 1 : 11;
  }
}
