import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export default function MapScreen() {
  const navigate = useNavigate();
  return (
    <div className='map'>
      <div className='map__nav'>
        <div className='map__nav-title'>30-day Map Challenge 2022</div>
        <div className='map__nav-btn-grp'>
          <Button
            type='primary'
            onClick={() => {
              navigate('/');
            }}
          >
            Back to List
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
