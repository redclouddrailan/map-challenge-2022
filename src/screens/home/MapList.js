import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { setDetails } from 'features/home/homeSlice';
import mapListdata from 'features/home/mapListData';

export default function MapList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderList = () => (
    <div className='mapList'>
      {mapListdata.map((res) => {
        return (
          <Button
            type='link'
            className='home__list-item'
            onClick={() => {
              dispatch(setDetails(res));
              navigate(res.url);
            }}
          >
            <div className='home__list-title'>{res.label}</div>
            <div className='home__list-desc'>{res.description}</div>
          </Button>
        );
      })}
    </div>
  );

  return renderList();
}
