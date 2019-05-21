import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import{ ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent }  from './client-detail/client-detail.component';
import { OperatorComponent } from './operator/operator.component';
import { AcessoriosComponent } from './acessorios/acessorios.component';
import { AcessoriosDetailComponent } from './acessorios-detail/acessorios-detail.component';
import { CitiesComponent } from './cities/cities.component'; 
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'detail/:id', component: ClientDetailComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'acessorios', component: AcessoriosComponent },
  { path: 'acessorios/:id', component: AcessoriosDetailComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'home', component: HomeComponent },
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
