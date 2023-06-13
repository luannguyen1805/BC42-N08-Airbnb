import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillGeoAltFill } from "react-icons/bs";
import { FcGlobe } from "react-icons/fc";
import { MdHotelClass } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeaderLocationItem = ({ location }) => {
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = () => {
    const tenViTri = location?.tenViTri.replace(" ", "_");
    window.scroll(0, 0);
    navigate(`/detailLocation/${location?.id}/${tenViTri}`);
  };

  const handleHeartClick = () => {
    setStatus(!status);
    console.log("a");
  };

  const handleLocationClick = () => {
    const tenViTri = location?.tenViTri.replace(" ", "_");
    window.scroll(0, 0);
    navigate(`/detailLocation/${location?.id}/${tenViTri}`);
  };

  return (
    <div className="my-10 Header_Card hover:-translate-y-2 hoverDn rounded-xl cursor-pointer h-full">
      <div className="image relative -z-10">
        <img
          src={location.hinhAnh || "https://picsum.photos/300/300"}
          alt=""
          className="w-full h-full rounded-2xl"
          onClick={handleImageClick}
        />
        <button
          className="absolute top-3 right-3 z-50 cursor-pointer w-10 h-10"
          onClick={handleHeartClick}
        >
          {status ? (
            <AiFillHeart className="text-xl text-rose-400 cursor-pointer" />
          ) : (
            <AiOutlineHeart className="text-xl text-rose-400 cursor-pointer" />
          )}
        </button>
      </div>
      <div className="" onClick={handleLocationClick}>
        <div className="flex justify-start mt-2 relative">
          <span>
            <MdHotelClass />
          </span>
          <span className="font-semibold text-base inline-block ml-2">
            Khu du lịch {location.tenViTri || "Khu du lịch"}
          </span>
        </div>
        <div className="m-0 text-gray-500 text-sm flex justify-start">
          <span className="text-rose-500">
            <BsFillGeoAltFill />
          </span>
          <span className="ml-2">Tỉnh {location.tinhThanh || " Tinh Thanh"}</span>
        </div>
        <div className="m-0 text-gray-500 text-sm flex justify-start">
          <span className="text-lg">
            <FcGlobe />
          </span>
          <span className="ml-2">{location.quocGia || " Quoc Gia "}</span>
        </div>
        <div className="mt-4">
          <span
            className="py-2 px-6 font-medium hoverDn hover:bg-rose-400 text-rose-500 hover:text-yellow-50 text-center rounded-md"
            style={{ border: "2px solid rgb(251 113 133)" }}
          >
            Xem danh sách phòng
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderLocationItem;
