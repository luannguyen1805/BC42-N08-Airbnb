import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import useScroll from "../../Hooks/UseScroll";
import { MdLocationOn } from "react-icons/md";
import { getDetailRoom } from "../../redux/Reducers/roomReducer";

export default function HeaderSearch(props) {
  const dispatch = useDispatch();
  const { locationList } = useSelector((state) => state.locationReducer);
  const { searchVisible, setSearchVisible } = props;
  const [positionVisible, setPositionVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const scroll = useScroll();
  useEffect(() => {
    if (scroll > 300) {
      setPositionVisible(false);
      setSearchVisible(false);
    }
  }, [scroll]);

  const handleLocationClick = (item) => {
    dispatch(getDetailRoom(item.id));
    const tenViTri = item.tenViTri.replace(" ", "_");
    window.scroll(0, 0);
    navigate(`/detailLocation/${item.id}/${tenViTri}`);
  };


  const { TabPane } = Tabs;
  const navigate = useNavigate();

  const renderPosition = () => {
    const fillPositionArray = locationList?.filter((item) =>
      item.tenViTri.toLowerCase().includes(searchValue.toLowerCase())
    );
    return fillPositionArray?.map((item, index) => (
      <div
        onClick={() => handleLocationClick(item)}
        className="p-3 flex items-center cursor-pointer hover:bg-zinc-400 transition-all duration-300"
        key={index}
      >
        <div className="inline-block p-2 mr-2 bg-orange-200 rounded-md text-red-600">
          <MdLocationOn />
        </div>
        <div>
          <span>{item.tenViTri}</span> - Thành phố <span>{item.tinhThanh}</span> - <span>{item.quocGia}</span>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div
        onClick={setSearchVisible}
        className={classnames("headerSearch absolute z-10 transition-all duration-300 ", {
          hidden: !searchVisible,
        })}
      >
        <Tabs
          defaultActiveKey="" centered
          items={[
            {
              label: (
                <div>
                  <div className="font-medium text-black">Địa điểm</div>
                  <input
                    placeholder="Bạn sắp đi đâu ?"
                    type="text"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClick={() => {
                      setPositionVisible(!positionVisible);
                    }}
                    className="w-full outline-none border-none focus:ring-0"
                  />
                </div>
              ),
              key: '1',
              children: (positionVisible && (
                <div
                  style={{
                    height: "400px",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 2px 2px rgba(0,0,0,0.2)",
                  }}
                  className={classnames(
                    "rounded-2xl absolute z-10 overflow-y-scroll animate__fadeInDownBig animate__animated w-11/12 lg:w-6/12",
                    {
                      hidden: !positionVisible,
                    }
                  )}
                >
                  {renderPosition()}
                </div>
              )),
            },
            {
              label: (
                <div className="flex flex-col">
                  <span className="font-semibold">Nhận phòng</span>
                </div>
              ),
              key: '2',
            },
            {
              label: (
                <div className="flex flex-col">
                  <span className="font-semibold">Trả phòng</span>
                </div>
              ),
              key: '3',
            },
            {
              label: (
                <div className="flex flex-col">
                  <span className="font-semibold">Khách</span>
                  <span className="font-sans text-gray-500">Thêm khách</span>
                </div>
              ),
              key: '4',
            },
          ]}
        />
      </div>
    </div>
  );
}

