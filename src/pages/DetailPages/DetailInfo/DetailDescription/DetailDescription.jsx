import React from "react";
import { GrKey, GrHome } from "react-icons/gr";
import { useAppSelector } from "../../../../Hooks/HooksRedux";

const DetailDescription = () => {
  const { roomDetail } = useAppSelector((state) => state.roomReducer);
  return (
    <div>
      <div className="flex justify-between border-b border-slate-400 pb-5">
        <div className="">
          <div className="font-medium text-2xl">{`Toàn bộ nhà nghỉ thôn dã. Chủ nhà ${"HOANG_HY"}`}</div>
          <div className="text-lg">
            {roomDetail?.khach} khách · {roomDetail?.phongNgu} phòng ngủ · {roomDetail?.giuong} giường · {roomDetail?.phongTam} phòng tắm
          </div>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src="https://a0.muscache.com/im/pictures/d0e3bb05-a96a-45cf-af92-980269168096.jpg?im_w=720"
            alt="..."
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="mt-8 border-b border-slate-400 pb-5">
        <div className="flex items-center">
          <div className="font-medium text-3xl mr-3">
            <GrHome />
          </div>
          <div className="">
            <div className="font-bold pb-2 text-base">
              Điểm nổi bật
            </div>
            <div className="">
            {roomDetail?.moTa}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-b border-slate-400 pb-5">
        <div className="flex items-center">
          <div className="font-medium text-3xl mr-3">
            <GrKey />
          </div>
          <div className="">
            <div className="font-bold pb-2 text-base">
              Trải nghiệm nhận phòng tuyệt vời
            </div>
            <div className="">
              95% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDescription;
