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
import Globe from 'screens/maps/Globe';
import Favourites from 'screens/maps/Favourites';
import Kontur from 'screens/maps/kontur';
import Null from 'screens/maps/Null';
import Movement from 'screens/maps/Movement';
import TwoColours from 'screens/maps/TwoColours';
import Islands from 'screens/maps/Islands';
import Fantasy from 'screens/maps/Fantasy';
import Music from 'screens/maps/Music';
import ThreeDimensional from 'screens/maps/ThreeDimensional';
import OutofComfort from 'screens/maps/OutofComfort';
import Remix from 'screens/maps/Remix';
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
          <Route path='globe' element={<Globe />} />
          <Route path='favourite' element={<Favourites />} />
          <Route path='kontur' element={<Kontur />} />
          <Route path='null' element={<Null />} />
          <Route path='movement' element={<Movement />} />
          <Route path='two-colours' element={<TwoColours />} />
          <Route path='islands' element={<Islands />} />
          <Route path='fantasy' element={<Fantasy />} />
          <Route path='music' element={<Music />} />
          <Route path='3D' element={<ThreeDimensional />} />
          <Route path='out-of-my-comfort-zone' element={<OutofComfort />} />
          <Route path='remix' element={<Remix />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
