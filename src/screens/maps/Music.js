import React, { useRef, useEffect } from 'react';
import points from 'data/music-stores-philippines.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
import music from 'assets/icons/music.png';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Music() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [122, 13],
      zoom: 4.9,
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('points', {
        type: 'geojson',
        data: points,
      });
      map.current.addLayer({
        id: 'point-layer',
        type: 'circle',
        source: 'points',
      });
    });
    // Add markers to the map.
    for (const marker of points.features) {
      // Create a DOM element for each marker.
      const el = document.createElement('div');

      el.className = 'marker';
      el.style.backgroundImage = `url(${music})`;
      el.style.width = `25px`;
      el.style.height = `25px`;
      el.style.backgroundSize = '100%';

      el.addEventListener('click', () => {
        window.alert(marker.properties.message);
      });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);
    }
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
