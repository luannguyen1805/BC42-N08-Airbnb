import React, { useRef } from "react";
import { Carousel } from "antd";
import { FcNext, FcPrevious } from "react-icons/fc";

const images = [
  {
    id: 1,
    url: "https://toigingiuvedep.vn/wp-content/uploads/2021/07/hinh-anh-dep-thien-nhien-viet-nam.jpg",
  },
  {
    id: 2,
    url: "https://tindep.com/wp-content/uploads/2019/10/anh-thien-nhien-viet-nam-35.jpg",
  },
  {
    id: 3,
    url: "https://haycafe.vn/wp-content/uploads/2022/03/Hinh-anh-dep-ve-thien-nhien-Viet-Nam.jpg",
  },
  {
    id: 4,
    url: "https://toigingiuvedep.vn/wp-content/uploads/2020/12/hinh-anh-phong-canh-thien-nhien-dep-nhat-the-gioi.jpg",
  },
];

export default function CarouselComponent() {
  const slider = useRef(null);
  return (
    <div className="relative ">
      <button
        className="absolute left-0 font-medium text-3xl"
        style={{ top: "50%", transform: "translateY(-50%)", zIndex: "2" }}
        onClick={() => slider.current?.prev()}
      >
        <FcPrevious />
      </button>
      <div className="">
        <Carousel ref={slider} autoplay fade>
          {images.map((item, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    backgroundImage: `url('${item.url}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: "400px",
                  }}
                ></div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <button
        className="absolute right-0 font-medium text-3xl"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        onClick={() => slider.current?.next()}
      >
        <FcNext />
      </button>
    </div>
  );
}
