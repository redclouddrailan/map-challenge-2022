import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Blue() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  //   const [data, setData] = useState('');

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/isochrone/v1/mapbox/driving/122.9639428734954%2C14.1143471458996?contours_minutes=15%2C30%2C45%2C60&contours_colors=08519c%2C3182bd%2C6baed6%2Cbdd7e7&polygons=true&denoise=1&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);

        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
          center: [122.9639428734954, 14.1143471458996],
          zoom: 11,
        });

        map.current.on('load', () => {
          map.current.addSource('iso', {
            type: 'geojson',
            data,
          });
          map.current.addLayer(
            {
              id: 'isoLayer',
              type: 'fill',
              source: 'iso',
              layout: {},
              paint: {
                'fill-color': 'blue',
                'fill-opacity': 0.3,
              },
            },
            'poi-label'
          );
        });
      });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
