import { Injectable } from '@angular/core';
// Importar environment donde se guardo la API KEY por defecto
import { environment } from 'src/environments/environment';
// Importar propiedades del Mapbox
import * as mapboxgl from 'mapbox-gl';
import { PintarMapaService } from '../PintarMapa/pintar-mapa.service';


@Injectable({
  providedIn: 'root'
})
export class DatosApiService {

  // Variable con objeto MAP
  mapa: mapboxgl.Map;
  // Variable con las coordenadas de algunas ciudades del país
  coordenadas = [
    {
        x : -75.3737106,
        y : 6.1551499
    },
    {
        x: -74.081749,
        y: 4.6097102
    },
    {
        x: -76.5224991,
        y: 3.4372201
    },
    {
        x: -75.563591,
        y: 6.2518401
    },
    {
        x: -74.7813187,
        y: 10.9685402
    },
    // {
    //     x: -75.5144424,
    //     y: 10.3997202
    // },
    // {
    //     x: -72.5078201,
    //     y: 7.8939099
    // },
    // {
    //     x: -73.1197968,
    //     y: 7.1253901
    // },
    // {
    //     x: -75.6961136,
    //     y: 4.8133302
    // },
    // {
    //     x: -74.1990433,
    //     y: 11.2407904
    // },
    // {
    //     x: -75.2322235,
    //     y: 4.43889
    // },
    // {
    //     x: -75.5579529,
    //     y: 6.3373199
    // },
    {
      x: -77.2811127,
      y: 1.2136101
    },
    {
      x: -75.5173798,
      y: 5.0688901
    },
    {
      x: -75.2818909,
      y: 2.9273
    },
    {
      x: -74.7645874,
      y: 10.9184303
    },
    {
      x: -73.6266403,
      y: 4.1420002
    },
    {
      x: -75.6811066,
      y: 4.5338898
    },
    {
      x: -74.2168198,
      y: 4.57937
    },
    {
      x: -73.2532196,
      y: 10.4631395
    },
    {
      x: -75.5991287,
      y: 6.1846099
    },
    {
      x: -75.8814316,
      y: 8.7479801
    },
    {
      x: -75.5917435,
      y: 6.17591
    },
    {
      x: -75.5984568,
      y: 6.2422201
    },
    {
      x: -75.5739233,
      y: 6.2315268
    }
];

  /**
   * Método constructor 
   * => Como parámetro se inicializa el servicio PintarMapaService
   *    con el fin de usar sus métodos.
   * @param frontMapa 
   */
  constructor(private frontMapa: PintarMapaService) {
    // Token de la API de Mapbox
    mapboxgl.accessToken = environment.mapboxKey;
  }


  /**
   * Método encargado de controlar con que parámetros debe ser invocado la función que 
   * traera los datos del API, es un switche según la categóría seleccionada.
   * @param place 
   */
  mostrarPlace(place) {
    if(place === 'restaurantes'){
      this.obtenerDatos('Coffee Shop', '#ffc38b');
    } else if(place === 'gasolineras'){
      this.obtenerDatos('Gas Station', 'red');
    } else if(place === 'aeropuertos'){
      this.frontMapa.pintarAeropuertos();
    }
  }

  /**
   * Método para obtener datos según la categoría de busqueda
   *  => categorías disponibles => Restaurantes, Gasolineras y Aeropuertos
   */
  obtenerDatos (categoria, color) {

    for (let i = 0; i < this.coordenadas.length; i++) {
      
      let url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&category=${categoria}&location=${this.coordenadas[i].x},${this.coordenadas[i].y}&outFields=Place_addr, PlaceName`;

      /**
       * Función propia de JavaScript que nos servirá para consumir la API
       * haciendo uso de la url generada, cuando este método recibe los datos
       * en una de sus promesas invoca el método de CrearMarcador(), y así
       * pintarlos sobre el mapa.
       */
      fetch(url)
        .then((res => {
          return res.json();
        }))
        .then((data => {
          let coordenada;
          for (let i = 0; i < data.candidates.length; i++) {
            coordenada = data.candidates[i].location;
            this.frontMapa.crearMarcador(coordenada.x, coordenada.y, color);
          }
        }))
      
    }
  }
}
