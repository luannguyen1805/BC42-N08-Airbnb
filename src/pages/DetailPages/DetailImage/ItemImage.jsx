import React, { useEffect } from "react";
import { TiThSmall } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../../../Hooks/HooksRedux";
import { modal } from "../../../redux/Reducers/openModalReducer";
import { getDetailRoom } from "../../../redux/Reducers/roomReducer";
import { useParams } from "react-router-dom";

export default function ItemImage() {
  const { id } = useParams();
  const { roomDetail } = useAppSelector((state) => state.roomReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDetailRoom(id));
  }, [dispatch, id]);

  const openImageModal = () => {
    const action = modal(true);
    dispatch(action);
  };

  return (
    <>
      <div
        className="w-full h-full relative"
        onClick={openImageModal}
        style={{
          backgroundImage: `url(${roomDetail?.hinhAnh})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <button
          className="absolute right-8 bottom-5 bg-white py-1 px-3 text-base hover:bg-slate-100 rounded-lg border-black flex items-center"
          style={{ border: "1px solid black" }}
          onClick={openImageModal}
        >
          <TiThSmall className="mr-2 font-medium" />
          Hiện tất cả các ảnh
        </button>
      </div>
    </>
  );
}
