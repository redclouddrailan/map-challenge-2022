import React, { useRef, useEffect } from 'react';
import footprints from 'data/iloilo_bldgs.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function OutofComfort() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  console.log(footprints);

  const colorValues = [
    0,
    '#000',
    100,
    '#e0f3db',
    1000,
    '#ccebc5',
    2000,
    '#a8ddb5',
    3000,
    '#7bccc4',
  ];

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [122.5705, 10.6952],
      zoom: 16,
      pitch: 70,
      bearing: -17.6,
      antialias: true,
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('iloilo', {
        type: 'geojson',
        data: footprints,
      });
      map.current.addLayer(
        {
          id: 'poly',
          type: 'fill-extrusion',
          source: 'iloilo', // reference the data source
          layout: {},
          paint: {
            // 'fill-color': 'blue', // blue color fill
            // 'fill-opacity': 1,
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'area'],
              ...colorValues,
            ],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'heightmax'],
            ],
            // 'fill-extrusion-base': [
            //   'interpolate',
            //   ['linear'],
            //   ['zoom'],
            //   15,
            //   0,
            //   15.05,
            //   ['get', 'heightmean'],
            // ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        'poi-label'
      );
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
