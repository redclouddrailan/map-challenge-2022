import React, { useRef, useEffect } from 'react';
import footprints from 'data/iloilo_bldgs.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function ThreeDimensional() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  console.log(footprints);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    function rotateCamera(timestamp) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }
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
      rotateCamera(0);
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
            'fill-extrusion-color': 'red',
            // Get the `fill-extrusion-color` from the source `color` property.

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
