import React, { useRef, useEffect, useState, useCallback } from 'react';
import ukData from 'data/ukraine-data.geojson';
import ukBounds from 'data/ukraine-boundary.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Ukraine() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [30.523333, 50.450001],
      zoom: 4.9,
    });

    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';

      map.current.addSource('bounds', {
        type: 'geojson',
        data: ukBounds,
      });
      map.current.addLayer({
        id: 'bounds-layer',
        type: 'line',
        source: 'bounds',
        paint: {
          'line-width': 0.5,
          'line-color': 'red',
        },
      });

      map.current.addSource('points', {
        type: 'geojson',
        data: ukData,
      });
      map.current.addLayer(
        {
          id: 'points-heat',
          type: 'heatmap',
          source: 'points',
          maxzoom: 15,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              0,
              0,
              6,
              1,
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)',
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              2,
              9,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              1,
              9,
              0,
            ],
          },
        },
        'waterway-label'
      );

      map.current.addLayer(
        {
          id: 'point-circle',
          type: 'circle',
          source: 'points',
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              ['interpolate', ['linear'], ['get', 'best_est'], 1, 1, 6, 4],
              16,
              ['interpolate', ['linear'], ['get', 'best_est'], 1, 5, 6, 50],
            ],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'best_est'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              4,
              'rgb(253,219,199)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)',
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
          },
        },
        'waterway-label'
      );

      map.current.on('mousemove', 'point-circle', (e) => {
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
          <div>
            {hoverInfo.feature.properties.where_coordinates}:
            {hoverInfo.feature.properties.best_est}
          </div>
        </div>
      )}
    </div>
  );
}
