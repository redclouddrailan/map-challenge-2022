import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Minimal() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [122.7633, 14.139],
      zoom: 9,
    });
    const marker1 = new mapboxgl.Marker().setLngLat([122.7633, 14.139]);

    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';

      map.current.addSource('mapbox-terrain', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2',
      });
      map.current.addLayer({
        id: 'terrain-data',
        type: 'line',
        source: 'mapbox-terrain',
        'source-layer': 'contour',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ff69b4',
          'line-width': 1,
        },
      });
    });
    marker1.addTo(map.current);
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
