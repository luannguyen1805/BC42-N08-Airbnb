import React, { useEffect, useState } from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { MdOutlineIron } from "react-icons/md";
import { TbParking, TbToolsKitchen2 } from "react-icons/tb";
import { SlScreenDesktop } from "react-icons/sl";
import { useAppSelector } from "../../../../Hooks/HooksRedux";
import { FaSwimmingPool } from "react-icons/fa";
import { SiApacheairflow } from "react-icons/si";

const DetailEquipment = () => {
  const [arrEquipment, setArrEquipment] = useState([]);
  const { roomDetail } = useAppSelector((state) => state.roomReducer);

  const getImageEquipment = (name, active) => {
    switch (name) {
      case "bep": {
        return {
          name: "Bếp",
          active,
          imageEquipment: <TbToolsKitchen2 />,
        };
      }
      case "mayGiat": {
        return {
          name: "Máy giặt",
          active,
          imageEquipment: <SiApacheairflow />,
        };
      }
      case "dieuHoa": {
        return {
          name: "Điều Hòa",
          active,
          imageEquipment: <SiApacheairflow />,
        };
      }
      case "tivi": {
        return {
          name: "Tivi",
          active,
          imageEquipment: <SlScreenDesktop />,
        };
      }
      case "wifi": {
        return {
          name: "Wifi",
          active,
          imageEquipment: <AiOutlineWifi />,
        };
      }
      case "doXe": {
        return {
          name: "Đỗ Xe",
          active,
          imageEquipment: <TbParking />
        };
      }
      case "hoBoi": {
        return {
          name: "Hồ Bơi",
          active,
          imageEquipment: <FaSwimmingPool />
        };
      }
      case "banLa": {
        return {
          name: "Bàn ũi",
          active,
          imageEquipment: <MdOutlineIron />
        };
      }
      default:
        break;
    }
  };
  const addEquipment = () => {
    let arrEquipment = [];
    for (let item in roomDetail) {
      if (typeof roomDetail[item] === "boolean") {
        let equipment = getImageEquipment(
          item,
          roomDetail[item]
        );
        arrEquipment.push(equipment);
      }
    }
    setArrEquipment(arrEquipment);
  };
  useEffect(() => {
    addEquipment();
  }, [roomDetail]);

  return (
    <div className="mt-4 border-b border-slate-400 pb-5 ">
      <div className="font-medium text-xl">Nơi này có những gì cho bạn</div>
      <div className="grid grid-cols-2 gap-x-32 text-base">
        {arrEquipment.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item?.active
                  ? "flex items-center gap-2 py-2 "
                  : "flex items-center gap-2 py-2 line-through"
              }
            >
              {item?.imageEquipment}
              <p>{item?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailEquipment;
