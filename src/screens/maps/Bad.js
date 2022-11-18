import React, { useRef, useEffect } from 'react';
import points from 'data/poverty.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Bad() {
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
        data: { ...points, features: processPoints(points) },
      });
      map.current.addLayer({
        id: 'point-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-color': 'red',
          'circle-opacity': 0.4,
          'circle-radius': ['get', 'PovInc2012'],
        },
      });
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
