import React, { useRef, useEffect } from 'react';
import points from 'data/healthsites.geojson';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Point() {
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
        data: points,
      });
      map.current.addLayer({
        id: 'point-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-color': [
            'match',
            ['get', 'amenity'],
            'pharmacy',
            '#fbb03b',
            'clinic',
            '#223b53',
            'hospital',
            'red',
            'dentist',
            '#3bb2d0',
            /* other */ 'pink',
          ],
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
    });
  }, []);

  return (
    <div ref={mapContainer} className='map__details'>
      <div className='map__legend'>
        <div className='map__legend-container'>
          <div className='map__legend-body'>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>Pharmacy</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#fbb03b' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>Clinic</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#223b53' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>Hospital</div>
              <div
                className='map__legend-item-value'
                style={{ background: 'red' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>Dentist</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#3bb2d0' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>Others</div>
              <div
                className='map__legend-item-value'
                style={{ background: 'pink' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
