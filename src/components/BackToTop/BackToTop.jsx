import { FloatButton } from "antd";
import React from "react";
import { TiArrowUpThick } from "react-icons/ti";

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#ccc",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
  position: "relative",
};

const ArrowUpThick = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: 20,
  color: "black",
  zIndex: 1,
};

const BackToTop = () => {
  return (
    <FloatButton.BackTop>
      <div style={style}>
        <div style={ArrowUpThick}>
          <TiArrowUpThick />
        </div>
      </div>
      </FloatButton.BackTop>
  );
};

export default BackToTop;
