import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackToTop from "../../components/BackToTop/BackToTop";
import ModalPopup from "../../components/Modal/ModalPopup";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { getCommentRoomById } from "../../redux/Reducers/commentReducer";
import { getLocationDetailById } from "../../redux/Reducers/locationReducer";
import { getDetailRoom } from "../../redux/Reducers/roomReducer";
import DetailComment from "./DetailComment/DetailComment";
import DetailInfoRoom from "./DetailInfo/DetailInfo";
import DetailReview from "./DetailReview/DetailReview";
import DetailTitle from "./DetailTitle/DetailTitle";
import DetailImage from "./DetailImage/DetailImage";
import DetailImageModal from "./DetailImage/DetailImageModal/DetailImageModal";

const DetailPages = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { roomDetail } = useAppSelector((state) => state.roomReducer);

  useEffect(() => {
    const action1 = getDetailRoom(id);
    dispatch(action1);
    const action2 = getLocationDetailById(Number(id));
    dispatch(action2);
    const action3 = getCommentRoomById(Number(id));
    dispatch(action3);
  }, [dispatch, id]);

  return (
    <div className="relative">
      {/* <HeaderDetail /> */}
      <div className="mt-28">
        <div className="container ">
          <DetailTitle />
          <DetailImage/>
          <DetailInfoRoom id={id} />
          <DetailReview />
          <DetailComment idRoom={roomDetail?.id} />

          {/* <DetailUser /> */}

          <ModalPopup />
          <ToastContainer />
          <BackToTop />
          <DetailImageModal/>
        </div>
      </div>
    </div>
  );
};

export default DetailPages;
