import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from 'screens/home/HomeScreen';
import MapScreen from 'screens/maps/MapScreen';
import Point from 'screens/maps/Point';
import Line from 'screens/maps/Line';
import Polygons from 'screens/maps/Polygons';
import Ukraine from 'screens/maps/Ukraine';
import Green from 'screens/maps/Green';
import Network from 'screens/maps/Network';
import Raster from 'screens/maps/Raster';
import OSM from 'screens/maps/OSM';
import Space from 'screens/maps/Space';
import Bad from 'screens/maps/Bad';
import Red from 'screens/maps/Red';
import Scale from 'screens/maps/Scale';
import FiveMinute from 'screens/maps/FiveMinute';
import 'antd/dist/antd.css';
import 'styles/index.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import Hexagons from 'screens/maps/Hexagons';
import Food from 'screens/maps/food';
import Minimal from 'screens/maps/Minimal';
import Blue from 'screens/maps/Blue';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route element={<MapScreen />}>
        <Route path='/map'>
          <Route path='point' element={<Point />} />
          <Route path='line' element={<Line />} />
          <Route path='polygons' element={<Polygons />} />
          <Route path='green' element={<Green />} />
          <Route path='ukraine' element={<Ukraine />} />
          <Route path='network' element={<Network />} />
          <Route path='raster' element={<Raster />} />
          <Route path='osm' element={<OSM />} />
          <Route path='space' element={<Space />} />
          <Route path='bad-map' element={<Bad />} />
          <Route path='red' element={<Red />} />
          <Route path='red' element={<Red />} />
          <Route path='scale' element={<Scale />} />
          <Route path='minute-map' element={<FiveMinute />} />
          <Route path='hexagons' element={<Hexagons />} />
          <Route path='food-drink' element={<Food />} />
          <Route path='minimal' element={<Minimal />} />
          <Route path='blue' element={<Blue />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
