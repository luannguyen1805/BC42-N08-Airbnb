import { Button, Menu } from "antd";
import { Layout } from "antd";
import React from "react";
import useScroll from "../../../Hooks/UseScroll";

const { Header } = Layout;

const HeaderDetail = () => {
  const scroll = useScroll();
  const items1 = [
    { title: "Ảnh", path: "#" },
    { title: "Tiện nghi", path: "#" },
    { title: "Đánh giá", path: "#" },
  ].map((item) => ({
    key: item.title,
    label: item.title,
  }));

  return (
    <div
      className={`${
        scroll >= 540
          ? "fixed top-0 z-10 bg-white w-full h-5,75rem border-b-2 transition-all ease-in-out delay-150"
          : "hidden"
      }`}
    >
      <div className="flex items-center justify-between container">
        <Header className="header h-full w-2/4 bg-white p-0">
          <div className="logo" />
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            onClick={(value) => {
              console.log(value);
            }}
            style={{
              paddingTop: "27px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          />
        </Header>
        {/* {scroll >= 1000 ? (
          <div className="pr-20 flex items-center gap-4">
            <p className="text-xl font-medium">$1222 dem</p>
            <Button className="rounded-2xl bg-red-600 text-yellow-50 px-9" size="large">
              Đặt Phòng
            </Button>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default HeaderDetail;
