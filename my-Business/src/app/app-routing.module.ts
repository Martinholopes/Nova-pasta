import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{ ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
