import React, { useRef } from 'react';
import { DownCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import MapList from 'screens/home/MapList';
export default function HomeScreen() {
  const mapListRef = useRef(null);

  const executeScroll = () => mapListRef.current.scrollIntoView();
  // run this function from an event handler or an effect to execute scroll
  return (
    <div className='home'>
      <div className='home__container'>
        <div className='home__title'>30-day Map Challenge 2022</div>
        <div className='home__subtitle'>by: Drailan John Terrible</div>
        <div className='home__down-icon'>
          <Button
            // type='primary'
            onClick={executeScroll}
            shape='circle'
            size='large'
            icon={<DownCircleOutlined />}
          />
        </div>
      </div>
      <div className='home__list' ref={mapListRef}>
        <div className='home__list-container'>
          <MapList />
        </div>
      </div>
    </div>
  );
}
