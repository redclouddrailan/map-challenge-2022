import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Select } from 'antd';
import poverty from 'data/poverty.json';
import { get } from 'lodash';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processpolygons } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Point() {
  const mapContainer = useRef(null);
  const [filterInfo, setFilterInfo] = useState('PovInc2012');
  const [hoverInfo, setHoverInfo] = useState(null);
  const map = useRef(null);

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  const colorValues = [
    0,
    '#000',
    5,
    '#e0f3db',
    10,
    '#ccebc5',
    15,
    '#a8ddb5',
    20,
    '#7bccc4',
    25,
    '#4eb3d3',
    30,
    '#2b8cbe',
    35,
    '#0868ac',
    40,
    '#084081',
    45,
    '#001a5e',
    50,
    '#000149',
  ];

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
        data: poverty,
      });
      map.current.addLayer({
        id: 'polygons-layer',
        type: 'fill',
        source: 'polygons',
        paint: {
          'fill-outline-color': '#fff',
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', filterInfo],
            ...colorValues,
          ],
          'fill-opacity': 0.75,
        },
      });
    });
    map.current.on('mousemove', 'polygons-layer', (e) => {
      onHover(e);
    });
  }, []);

  const handleChange = (value) => {
    setFilterInfo(value);
    map.current.setPaintProperty('polygons-layer', 'fill-color', [
      'interpolate',
      ['linear'],
      ['get', value],
      ...colorValues,
    ]);
  };

  return (
    <div ref={mapContainer} className='map__details'>
      {hoverInfo && (
        <div
          className='tooltip'
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>
            {hoverInfo.feature.properties.adm2_name}:
            {parseFloat(
              get(hoverInfo, `feature.properties.${filterInfo}`)
            ).toFixed(2)}
          </div>
        </div>
      )}
      <div className='dropdown'>
        <Select
          defaultValue='PovInc2012'
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: 'PovInc2006',
              label: '2006',
            },
            {
              value: 'PovInc2009',
              label: '2009',
            },
            {
              value: 'PovInc2012',
              label: '2012',
            },
          ]}
        />
      </div>
      <div className='map__legend'>
        <div className='map__legend-container'>
          <div className='map__legend-body'>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>5</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#e0f3db' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>10</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#ccebc5' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>15</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#a8ddb5' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>20</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#7bccc4' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>25</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#4eb3d3' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>30</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#2b8cbe' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>35</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#0868ac' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>40</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#084081' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>45</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#001a5e' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>50+</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#000149' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
