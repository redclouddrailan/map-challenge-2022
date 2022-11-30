import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
import * as turf from '@turf/turf';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Movement() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    // San Francisco
    const origin = [-122.414, 37.776];

    // Washington DC
    const destination = [-77.032, 38.913];

    // A simple line from origin to destination.
    const route = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [origin, destination],
          },
        },
      ],
    };

    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    const point = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: origin,
          },
        },
      ],
    };

    const lineDistance = turf.length(route.features[0]);
    const steps = 500;

    const arc = [];
    // Draw an arc between the `origin` & `destination` of the two points
    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = turf.along(route.features[0], i);
      arc.push(segment.geometry.coordinates);
    }
    route.features[0].geometry.coordinates = arc;
    let counter = 0;

    function animate() {
      const start =
        route.features[0].geometry.coordinates[
          counter >= steps ? counter - 1 : counter
        ];
      const end =
        route.features[0].geometry.coordinates[
          counter >= steps ? counter : counter + 1
        ];
      if (!start || !end) return;

      // Update point geometry to a new position based on counter denoting
      // the index to access the arc
      point.features[0].geometry.coordinates =
        route.features[0].geometry.coordinates[counter];

      // Calculate the bearing to ensure the icon is rotated to match the route arc
      // The bearing is calculated between the current point and the next point, except
      // at the end of the arc, which uses the previous point and the current point
      point.features[0].properties.bearing = turf.bearing(
        turf.point(start),
        turf.point(end)
      );

      // Request the next frame of animation as long as the end has not been reached
      if (counter < steps) {
        window.requestAnimationFrame(animate);
      }

      counter = counter + 1;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [-96, 37.8],
      zoom: 3,
      pitch: 40,
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('route', {
        type: 'geojson',
        data: route,
      });
      map.current.addSource('point', {
        type: 'geojson',
        data: point,
      });
      map.current.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: {
          'line-width': 2,
          'line-color': '#007cbf',
        },
      });
      map.current.addLayer({
        id: 'point',
        source: 'point',
        type: 'symbol',
        layout: {
          // This icon is a part of the Mapbox Streets style.
          // To view all images available in a Mapbox style, open
          // the style in Mapbox Studio and click the "Images" tab.
          // To add a new image to the style at runtime see
          // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
          'icon-image': 'airport',
          'icon-size': 1.5,
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
        },
      });
      // Update the source with this new data
      map.current.getSource('point').setData(point);
      animate(counter);
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
