import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import RoomInfor from "./RoomInfor";
import { getBookingUserApi } from "../../../redux/Reducers/userReducer";

export default function RoomItem() {
  const dispatch = useDispatch();
  const { userBooking } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const action = getBookingUserApi();
    dispatch(action);
  }, []);

  // Code xử lí render
  const lengthroom = userBooking.length;
  const [statusLength, setStatusLength] = useState(2);

  const renderTicketInfo = () => {
    if (lengthroom > 1) {
      return (
        <>
          {userBooking.slice(0, statusLength).map((item, index) => {
            return <RoomInfor key={index} mainbooking={item} />;
          })}
        </>
      );
    } else {
      return (
        <>
          {userBooking.map((item, index) => {
            return <RoomInfor key={index} mainbooking={item} />;
          })}
        </>
      );
    }
  };

  return (
    <div>
      <div>{renderTicketInfo()}</div>
      <div className="text-center ">
        {lengthroom > 1 && lengthroom > statusLength ? (
          <p
            className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 mt-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-60 text-center cursor-pointer"
            onClick={() =>
              setStatusLength((preState) => {
                return preState + 1;
              })
            }
          >
            {" "}
            Xem thêm vé đã đặt
          </p>
        ) : (
          ""
        )}
        {statusLength >= lengthroom && lengthroom !== 0 && lengthroom > 1 ? (
          <div
            className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 mt-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-60 text-center cursor-pointer"
            onClick={() => setStatusLength(2)}
          >
            Vé của bạn đã hết !<p>Thu gọn</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
