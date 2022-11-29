import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
import equatorData from 'data/the-equator.json';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Point() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [0, 0],
      zoom: 2.5,
      projection: 'globe',
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('equator', {
        type: 'geojson',
        data: equatorData,
      });
      map.current.addLayer({
        id: 'bounds-layer',
        type: 'line',
        source: 'equator',
        paint: {
          'line-width': 0.5,
          'line-color': 'red',
        },
      });
    });

    const marker = new mapboxgl.Marker().setLngLat([0, 0]);
    marker.addTo(map.current);
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
