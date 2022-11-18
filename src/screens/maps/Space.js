import React, { useRef, useEffect } from 'react';
import meteorData from 'data/Meteorite-Landings.geojson';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { processPoints } from './functions';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Space() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/redclouddrailan/cl8k4fylm002x14r3ml25cotg',
      center: [122, 13],
      zoom: 2.5,
      projection: 'globe',
    });
    map.current.on('style.load', () => {
      map.current.setFog({}); // Set the default atmosphere style
    });
    map.current.on('load', () => {
      map.current.getCanvas().style.cursor = 'default';
      map.current.addSource('points', {
        type: 'geojson',
        data: meteorData,
      });
      map.current.addLayer({
        id: 'point-layer',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-opacity': 1,
          'circle-radius': 2,
          'circle-color': 'red',
        },
      });
    });

    // The following values can be changed to control rotation speed:

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 120;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Pause spinning on interaction
    map.current.on('mousedown', () => {
      userInteracting = true;
    });

    // Restart spinning the globe when interaction is complete
    map.current.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });

    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.
    map.current.on('dragend', () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on('pitchend', () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on('rotateend', () => {
      userInteracting = false;
      spinGlobe();
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.current.on('moveend', () => {
      spinGlobe();
    });
  }, []);

  return <div ref={mapContainer} className='map__details' />;
}
