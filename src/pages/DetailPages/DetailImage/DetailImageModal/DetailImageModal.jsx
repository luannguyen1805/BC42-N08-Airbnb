import React, { useEffect } from "react";
import { BsHeart } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/HooksRedux";
import { modal } from "../../../../redux/Reducers/openModalReducer";
import { getDetailRoom } from "../../../../redux/Reducers/roomReducer";
import { useParams } from "react-router-dom";
import "./DetailImageModal.scss"

export default function DetailImageModal() {
  const { id } = useParams();
  const { openModal } = useAppSelector((state) => state.openModalReducer);
  const { roomDetail } = useAppSelector((state) => state.roomReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const action1 = getDetailRoom(id);
    dispatch(action1);
  }, [dispatch, id]);

  const closeModal = () => {
    const action = modal(false);
    dispatch(action);
    window.scroll(0, 0);
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center  ${openModal
          ? "opacity-1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="fixed inset-0 bg-black opacity-70" onClick={closeModal}></div>
      <div className="container relative">
        <div className="max-w-full max-h-full bg-slate-50 relative p-4">
          <div className="w-full flex justify-start font-medium text-lg">
            <button className="basis-2/3 text-xl" onClick={closeModal}>
              <GrFormPrevious />
            </button>
            <div className="flex basis-1/3 justify-end gap-4">
              <div className="font-medium flex  items-center gap-1">
                <FiShare />
                <button className="underline underline-offset-1">
                  Chia sẻ
                </button>
              </div>
              <div className="font-medium flex  items-center gap-1">
                <BsHeart />
                <button className="underline underline-offset-1">Lưu</button>
              </div>
            </div>
          </div>
        </div>
          <div className="relative">
            <img
              src={roomDetail?.hinhAnh}
              alt=""
              className="w-full h-auto"
            />
        </div>
      </div>
    </div>
    
  );
}
