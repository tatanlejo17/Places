import { Component } from '@angular/core';
import { DatosApiService } from 'src/app/servicesControllers/API/datos-api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor (private dataApi: DatosApiService) { }

  /**
   * Función para indicar el id del botón que presionemos
   * => con ayuda del event.target, revisamos que botón ha
   * sido trigger y le pasamos el id al servicio que nos traerá
   * la información de la API
   * @param e 
   */

  datosPlace(e) {
    // Obtener el id del botón que ha sido presionado
    let place = e.target.id;
    this.dataApi.mostrarPlace(place);
  }
}
