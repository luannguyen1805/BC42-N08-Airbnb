import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookingApi } from '../redux/Reducers/bookingRoomReducer';
import { getUserApi } from '../redux/Reducers/userAdminReducer';

export default function UseCheckBooking() {
  const dispatch = useDispatch();
  const timeRef = useRef();
  const { roombookingList } = useSelector((state) => state.bookingReducer);
  const [isExit, setIsValid] = useState(true);

  useEffect(() => {
    dispatch(getBookingApi());
  }, []);

  const handleCheckBooKing = (e) => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      const result = roombookingList.find((item) => {
        return (
          e.target.value === item.ngayDi &&
          e.target.value === item.ngayDen &&
          e.target.value === item.id
        );
      });
      if (result) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }, 300);
  };

  return {
    isExit,
    handleCheckBooKing
  };
}
