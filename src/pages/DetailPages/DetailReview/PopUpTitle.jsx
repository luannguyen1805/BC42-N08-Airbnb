import { Input } from "antd";
import React from "react";
import { AiFillStar, AiOutlineSearch } from "react-icons/ai";

const PopUpTitle = ({ rating, totalReviews }) => {
  const { Search } = Input;
  return (
    <div className="">
      <div className="flex items-center gap-2 font-semibold text-2xl mt-5">
        <AiFillStar />
        {rating.toFixed(1)}
        <h2 className="">{`(${totalReviews}) đánh giá`}</h2>
      </div>
      <Search
        placeholder="Tìm kiếm..."
        prefix={<AiOutlineSearch />}
        className="mt-3"
      />
    </div>
  );
};

export default PopUpTitle;
