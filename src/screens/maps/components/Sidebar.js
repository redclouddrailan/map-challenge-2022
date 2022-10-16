import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { selectDetails, setDetails } from 'features/home/homeSlice';
import mapListdata from 'features/home/mapListData';

export default function Sidebar() {
  const navigate = useNavigate();
  const mapDetails = useSelector(selectDetails);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const extractData = mapListdata.filter(
      (res) => res.url === location.pathname
    );
    console.log(extractData);
    dispatch(setDetails(extractData[0]));
  }, []);
  return (
    <div className='sidebar'>
      <div className='sidebar__back'>
        <Button
          type='primary'
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            navigate('/');
          }}
        >
          <span style={{ fontWeight: 'bold' }}> Back to List</span>
        </Button>
      </div>
      <div className='sidebar__title'>{mapDetails.label}</div>
      <div className='sidebar__description'>{mapDetails.description}</div>
    </div>
  );
}
