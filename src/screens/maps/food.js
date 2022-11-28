import React, { useRef, useEffect, useState, useCallback } from 'react';
import points from 'data/restaurants-camarines-norte.geojson';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
import icon from 'assets/icons/restaurant-icon.png';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Point() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : false);
  }, []);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [122.7633, 14.139],
      zoom: 9,
    });

    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('points', {
        type: 'geojson',
        data: points,
      });
      map.current.loadImage(icon, (error, image) => {
        map.current.addImage('icon', image);
        console.log(error);
      });
      map.current.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'points', // reference the data source
        layout: {
          'icon-image': 'icon', // reference the image
          'icon-size': 0.1,
        },
      });

      map.current.addLayer({
        id: 'point-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-color': 'red',
          'circle-opacity': 1,
          'circle-radius': {
            base: 1.75,
            stops: [
              [12, 2],
              [22, 180],
            ],
          },
        },
      });
      map.current.on('mousemove', 'points', (e) => {
        onHover(e);
      });
      map.current.on('mouseleave', 'points', (e) => {
        onHover(e);
      });
    });
  }, []);

  return (
    <div ref={mapContainer} className='map__details'>
      {hoverInfo && (
        <div
          className='tooltip'
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>{hoverInfo.feature.properties.name}</div>
        </div>
      )}
    </div>
  );
}
