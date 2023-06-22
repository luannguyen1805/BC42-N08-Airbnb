import React from "react";
import { AiFillStar } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../../Hooks/HooksRedux";
import { modalPopUp } from "../../../redux/Reducers/openModalReducer";
import CommentUser from "./CommentUser";
import PopupReview from "./PopupReview";

const DetailReview = () => {
  const { commentById } = useAppSelector((state) => state.commentReducer);
  const dispatch = useAppDispatch();

  const getRandomUser = () => {
    if (commentById && Array.isArray(commentById) && commentById.length > 0) {
      const randomIndex = Math.floor(Math.random() * commentById.length);
      return commentById[randomIndex];
    }
    return null;
  };

  const user1 = getRandomUser();
  const user2 = getRandomUser();
  
  return (
    <div className="review" id="review">
      <div className="flex items-center gap-2 font-semibold text-2xl mt-5">
        <AiFillStar />
        <h2>{commentById?.length} đánh giá</h2>
      </div>
      <div className="grid grid-cols-2 mb-4 mt-2">
        <div>
          <CommentUser
            id={user1?.maNguoiBinhLuan}
            userCommentId={user1}
          />
        </div>
        <div>
          <CommentUser
            id={user2?.maNguoiBinhLuan}
            userCommentId={user2}
          />
        </div>
      </div>
      <button
        className="underline underline-offset-1 font-medium text-xl flex items-center mb-5"
        onClick={() => {
          dispatch(
            modalPopUp({
              ComponentContent: PopupReview,
              openModalPopup: true,
            })
          );
        }}
      >
        Hiển thị thêm
        <GrFormNext />
      </button>
    </div>
  );
};

export default DetailReview;
