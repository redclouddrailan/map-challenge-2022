import React, { useRef, useEffect } from 'react';
import points from 'data/poverty.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function TwoColours() {
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
      map.current.addSource('polygons', {
        type: 'geojson',
        data: points,
      });
      map.current.addLayer({
        id: 'point-layer',
        type: 'fill',
        source: 'polygons',
        paint: {
          'fill-outline-color': '#fff',
          'fill-color': [
            'match',
            ['get', 'PovPopClas'],
            1,
            'black',
            2,
            'black',
            3,
            'black',
            4,
            'red',
            5,
            'red',
            6,
            'red',
            7,
            'red',
            'red',
          ],
          'fill-opacity': 0.75,
        },
      });
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
