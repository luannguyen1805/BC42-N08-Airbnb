import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationApi } from "../../../redux/Reducers/locationReducer";
import HeaderLocationItem from "./HeaderLocationItem";

const HeaderLocation = () => {
  const dispatch = useDispatch();
  const { locationList } = useSelector((state) => state.locationReducer);
  
  useEffect(() => {
    dispatch(getLocationApi());
  }, [dispatch]);

  const renderLocationList = () => {
    return (
      <>
      <div className="flex justify-between flex-wrap py-10">
        {locationList?.slice(0, 12).map((location, index) => (
          <HeaderLocationItem key={index} location={location} />
        ))}
      </div>
      </>
    );
  };
  
  return <div className="container-dn">{renderLocationList()}</div>;
};

export default HeaderLocation;
