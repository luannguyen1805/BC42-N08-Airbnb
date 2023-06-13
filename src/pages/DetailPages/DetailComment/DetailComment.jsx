import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useState } from "react";
import { AiFillStar, AiOutlineSend } from "react-icons/ai";
import { getStoreJSON, http, USER_LOGIN } from "../../../utils/setting";
import { toast } from "react-toastify";
import { toastOptionsSuccess } from "../../../App";
import { useNavigate } from "react-router-dom";

export default function DetailComment({ idRoom }) {
  const [comment, setComment] = useState();
  const [star, setStar] = useState();
  const navigate = useNavigate();
  const arrStar = [
    { number: 1, active: false },
    { number: 2, active: false },
    { number: 3, active: false },
    { number: 4, active: false },
    { number: 5, active: false },
  ];
  const handleInput = async () => {
    let newComment = comment?.trim();
    if (newComment !== "") {
      if (star) {
        const date = moment(new Date()).format("DD/MM/YYYY");
        let userLogin = getStoreJSON(USER_LOGIN);
        if (userLogin) {
          let data = {
            maPhong: idRoom,
            maNguoiBinhLuan: userLogin.id,
            ngayBinhLuan: date.toString(),
            noiDung: comment,
            saoBinhLuan: star.number,
          };
          let result = await http.post("/binh-luan", data);
          if (result.status === 201) {
            toast.success("Bình luận thành công", toastOptionsSuccess);
          }
        } else {
          navigate("/login/1");
        }
      }
    } else {
      alert("hay nhap du lieu");
    }
    setComment(" ");
  };

  return (
    <div className="my-3 w-2/3">
      <TextArea
        rows={4}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <div className="mt-2 flex items-center gap-4">
        <span className="text-xl font-medium">Star</span>
        {arrStar.map((item, index) => {
          return (
            <button
              key={index}
              className={
                star?.active && star.number === item.number
                  ? "flex items-center gap-2 rounded-lg text-xl bg-red-500 px-2"
                  : "flex items-center gap-2 rounded-lg text-xl bg-slate-300 px-2"
              }
              onClick={() => {
                setStar({ ...item, active: true });
              }}
            >
              {item.number}
              <AiFillStar className="text-amber-500" />
            </button>
          );
        })}
      </div>
      <Button
        type="primary"
        block
        size="large"
        className="px-10 font-medium text-2xl bg-blue-500 mt-2 flex items-center gap-3"
        onClick={handleInput}
      >
        Send
        <AiOutlineSend />
      </Button>
    </div>
  );
}
