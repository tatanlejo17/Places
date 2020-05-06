import { Injectable } from '@angular/core';
// Importar environment donde se guardo la API KEY por defecto
import { environment } from 'src/environments/environment';
// Importar propiedades del Mapbox
import * as mapboxgl from 'mapbox-gl';
// Importar servicio interno de Mapbox - Geocoder
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


@Injectable({
  providedIn: 'root'
})
export class PintarMapaService {
  // Variable con objeto MAP
  mapa: mapboxgl.Map;

  constructor() {
    // Token de la API de Mapbox
    mapboxgl.accessToken = environment.mapboxKey;
  }

  pintarMapa(divMapa) {
    /**
     * Agregar mapa tipo outdoors según API de Mapbox
     * Con 4 atributos básicos, id del contenedor donde se agregará,
     * estilo según API, ubicación base en este caso Colombia y un Zoom
     */

    this.mapa = new mapboxgl.Map({
      container: divMapa,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.6408638, 4],
      zoom: 4.5
    });
  }


  /**
   * Método para agregar controles al mapa, esto es gracias a 
   * funcionalidad propia de Mapbox que se obtuvo durante el 
   * proceso de documentación de su funcionamientos
   */
  agregarControlesMapa() {
    // Agregar controles de ZOOM y Rotación al mapa
    this.mapa.addControl(new mapboxgl.NavigationControl());
    // Agregar control para pantalla completa sobre el mapa
    this.mapa.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('#mapa') }));
    // Agregar control para mostrar sobre el mapa la ubicación del usuario en tiempo real
    this.mapa.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
  }

  // Método para crear marcadores sobre el mapa
  crearMarcador(lng: number, lat: number, colorMarker: string) {
    let marker = new mapboxgl.Marker({
      draggable: false,
      color: colorMarker
    }).setLngLat([lng, lat])
      .addTo(this.mapa);
  }

  /**
   * Mapbox maneja un servicio interno de Geolocalización
   * del cual estamos usando la funcionalidad de Search, 
   * dentro de la configuración se limita la búsqueda a Colombia
   */
  funcionSearch() {
    this.mapa.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: 'co',
        marker: {
          color: 'red'
        },
        poi: 'restaurants'
      })
    );
  }


  /**
   * Método para insertar los puntos donde se encuentran todos los 
   * aerpuertos del mundo, así es como deberían crearse las demás categorías
   * pero no fue posible encontrar un geojson con la información para 
   * restaurantes y gasolineras.
   */
  pintarAeropuertos() {
    this.mapa.addSource('airports', {
      'type': 'vector',
      'url': 'mapbox://mapbox.04w69w5j'
    });
    this.mapa.addLayer({
      'id': 'airport',
      'source': 'airports',
      'source-layer': 'ne_10m_airports',
      'type': 'symbol',
      'layout': {
        'icon-image': 'airport-15',
        'icon-padding': 0,
        'icon-allow-overlap': true
      }
    });
  }
}
