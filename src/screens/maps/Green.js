import React, { useRef, useEffect, useState, useCallback } from 'react';
import treeCover from 'data/tree-cover.json';
import { get } from 'lodash';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processpolygons } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Green() {
  const mapContainer = useRef(null);
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
    -1,
    '#f7fcf5',
    0,
    '#e5f5e0',
    2,
    '#c7e9c0',
    4,
    '#a1d99b',
    6,
    '#74c476',
    8,
    '#41ab5d',
    10,
    '#238b45',
    12,
    '#006d2c',
    14,
    '#00441b',
  ];

  const getColor = (context) => {
    if (context === 'Strong increase' || context === 'Moderate increase') {
      return <span style={{ color: 'green' }}>{context}</span>;
    } else if (context === 'No Change') {
      return <span style={{ color: 'grey' }}>{context}</span>;
    } else {
      return <span style={{ color: 'red' }}>{context}</span>;
    }
  };

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
        data: treeCover,
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
            ['get', 'AvgTreeCov'],
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
              get(hoverInfo, `feature.properties.AvgTreeCov`)
            ).toFixed(2)}
            <p>{getColor(hoverInfo.feature.properties.TCovText)}</p>
          </div>
        </div>
      )}

      <div className='map__legend'>
        <div className='map__legend-container'>
          <div className='map__legend-body'>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>-1</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#f7fcf5' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>0</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#e5f5e0' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>2</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#c7e9c0' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>4</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#a1d99b' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>6</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#74c476' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>8</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#41ab5d' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>10</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#238b45' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>12</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#006d2c' }}
              />
            </div>
            <div className='map__legend-item'>
              <div className='map__legend-item-title'>14</div>
              <div
                className='map__legend-item-value'
                style={{ background: '#00441b' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
