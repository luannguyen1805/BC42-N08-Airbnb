import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUser } from '../redux/Reducers/userAdminReducer';

export default function UseCheckEmail() {
  const dispatch = useDispatch();
  const timeRef = useRef();
  const { arrUser } = useSelector((state) => state.userAdminReducer);
  const [isExitEmail, setIsValid] = useState(true);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleCheckEmail = (e) => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      const result = arrUser.find((item) => {
        return e.target.value === item.email;
      });
      if (result) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }, 300);
  };

  return {
    isExitEmail,
    handleCheckEmail
  };
}
