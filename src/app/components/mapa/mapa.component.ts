import { Component, OnInit } from '@angular/core';
import { PintarMapaService } from 'src/app/servicesControllers/PintarMapa/pintar-mapa.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {
  // Variable Global
  divMapa;

  /**
   * @param frontMapa 
   * Método constructor
   * => recibe como párametro un servicio de tipo Privado
   */
  constructor(private frontMapa: PintarMapaService) { }

  ngOnInit() {
    // Obtener el contenedor donde se mostrará el Mapa de MapBox
    this.divMapa = document.getElementById('mapa');

    /**
     * Llamar método pintarMapa del Service PintarMapaService
     * => Mostrar el mapa sobre el contenedor
     */
    this.frontMapa.pintarMapa(this.divMapa);

    this.frontMapa.funcionSearch();

    /**
     * Llamar método agregarControlesMapa del Service PintarMapaService
     * => Colocar varios botones de Control: Zoom in, Zoom out, Reset north, 
     *    Fullscreen, Find my location
     */
    this.frontMapa.agregarControlesMapa();    
  }
}
