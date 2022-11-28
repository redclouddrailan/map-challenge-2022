import React, { useRef, useEffect } from 'react';
import * as turf from '@turf/turf';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function FiveMinute() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  var radius = 0.5;
  var center = [120.9842, 14.5995];
  var options = { steps: 50, units: 'kilometers', properties: { foo: 'bar' } };
  var circle = turf.circle(center, radius, options);
  var line = turf.lineString(...circle.geometry.coordinates);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center,
      zoom: 15,
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('circle-src', {
        type: 'geojson',
        data: circle,
      });
      map.current.addLayer({
        id: 'circle-layer',
        type: 'fill',
        source: 'circle-src',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.4,
          'fill-outline-color': 'yellow',
        },
      });
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
