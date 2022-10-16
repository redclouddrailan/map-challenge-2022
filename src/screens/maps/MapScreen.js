import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'screens/maps/components/Sidebar';

export default function MapScreen() {
  return (
    <div className='map'>
      <Sidebar />
      <Outlet />
    </div>
  );
}
