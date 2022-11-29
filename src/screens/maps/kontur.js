import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
import sample from 'data/population-data.png';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Raster() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [121.0223, 14.6091],
      zoom: 4.9,
      projection: 'equirectangular',
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('radar', {
        type: 'image',
        url: sample,
        coordinates: [
          [116.8, 21.2],
          [126.699999604, 21.2],
          [126.699999604, 4.500000668000002],
          [116.8, 4.500000668000002],

          // [116.8, 21.2],
          // [126.699999604, 21.2],
          // [126.699999604, 4.500000668000002],
          // [116.8, 4.500000668000002],
        ],
      });
      map.current.addLayer({
        id: 'radar-layer',
        type: 'raster',
        source: 'radar',
        paint: {
          'raster-fade-duration': 0,
          'raster-opacity': 1,
        },
      });
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
