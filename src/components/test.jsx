import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { BsFillForwardFill, BsFillGeoAltFill } from "react-icons/bs";
import { getDetailRoom } from "../../../redux/Reducers/roomReducer";
import { http } from "../../../utils/setting";

export default function RoomInfor({ mainbooking }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formatDay = "DD/MM/YYYY";
  

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await http.get(
          `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${mainbooking.maPhong}`
        );
        setData(response.content);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-5 mt-8 cursor-default">
      <div
        className="sm:col-span-2 col-span-5 rounded-xl h-40 overflow-hidden"
        style={{ boxShadow: " 0 0 2px 4px rgba(0,0,0,0.3)" }}
      >
        <img
          className="h-full w-full rounded-xl"
          src={
            data?.hinhAnh ||
            "../../../assets/img/banner/banner-1.jpg"
          }
          alt=""
        />
      </div>
      <div className="relative col-span-2 mt-3 sm:mt-0 sm:col-span-3 sm:pl-4 flex flex-col justify-between">
        <div className="Infor_room">
          <div className="flex justify-start">
            <span className="text-rose-500 text-xl">
              <BsFillGeoAltFill />
            </span>
            <p className="text-base text-rose-600 font-semibold w-11/12 ml-2">
              {data?.tenPhong}
            </p>
          </div>
          <p className="m-0 mt-4 text-sm font-bold ml-10">
            {mainbooking.soLuongKhach} khách - {data?.phongNgu} phòng ngủ -{" "}
            {data?.phongTam} phòng tắm
          </p>
          <div className="flex justify-start w-9/12 mt-4 ml-10">
            <p className="mr-4">{moment(mainbooking.ngayDen).format(formatDay)}</p>
            <span className="mr-4">
              <BsFillForwardFill />
            </span>
            <p>{moment(mainbooking.ngayDi).format(formatDay)}</p>
          </div>
          <p className="flex text-sm font-extrabold justify-end w-10/12 mt-4">
            Giá tiền: {data?.giaTien}$ / ngày
          </p>
        </div>
      </div>
    </div>
  );
}

