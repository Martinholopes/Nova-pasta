import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import{ ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent }  from './client-detail/client-detail.component';
import { OperatorComponent } from './operator/operator.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'detail/:id', component: ClientDetailComponent },
  { path: 'operator', component: OperatorComponent },
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
