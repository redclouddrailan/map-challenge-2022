import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Favourites() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/clb1l0omd00n814o3fmmb5iaj',
      center: [122.7633, 14.139],
      zoom: 9,
      projection: 'equirectangular',
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
