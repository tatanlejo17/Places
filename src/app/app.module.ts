import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { PintarMapaService } from './servicesControllers/PintarMapa/pintar-mapa.service';
import { DatosApiService } from './servicesControllers/API/datos-api.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [PintarMapaService, DatosApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
