import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { MessagesComponent } from './messages/messages.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { OperatorComponent } from './operator/operator.component';
import { AcessoriosComponent } from './acessorios/acessorios.component';
import { AcessoriosDetailComponent } from './acessorios-detail/acessorios-detail.component';
import { CitiesComponent } from './cities/cities.component';
import { HomeComponent } from './home/home.component';
import { AcessorySearchComponent } from './acessory-search/acessory-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    MessagesComponent,
    ClientDetailComponent,
    OperatorComponent,
    AcessoriosComponent,
    AcessoriosDetailComponent,
    CitiesComponent,
    HomeComponent,
    AcessorySearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
