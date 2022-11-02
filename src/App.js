import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from 'screens/home/HomeScreen';
import MapScreen from 'screens/maps/MapScreen';
import Point from 'screens/maps/Point';
import Line from 'screens/maps/Line';
import Polygons from 'screens/maps/Polygons';
import 'antd/dist/antd.css';
import 'styles/index.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route element={<MapScreen />}>
        <Route path='/map'>
          <Route path='point' element={<Point />} />
          <Route path='line' element={<Line />} />
          <Route path='polygons' element={<Polygons />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
