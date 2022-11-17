import React, { useRef, useEffect } from 'react';
import points from 'data/healthsites.geojson';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
import sample from 'data/sample-1.png';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Raster() {
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
      map.current.addSource('radar', {
        type: 'image',
        url: sample,
        coordinates: [
          [119.8146910219077, 19.19446544068122], // bottom
          [121.2661811534511, 19.19446544068122], // right
          [121.2661811534511, 15.81547686655716], // top
          [119.8146910219077, 15.81547686655716], // left
        ],
      });
      map.current.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
          'raster-opacity': 0.5,
        },
      });
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
