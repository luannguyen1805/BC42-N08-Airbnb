import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, getStoreJSON, USER_LOGIN } from "../../utils/setting";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { getUserProfileAPI } from "../../redux/Reducers/userReducer";

export default function HeaderMenu() {
  const [userLog, setUserLog] = useState(null);
  const { userLogin } = useAppSelector((state) => state.userReducer);
  const { userProfile } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (userLogin && Object.keys(userLogin).length !== 0) {
        await setUserLog(userLogin);
      }
      await dispatch(getUserProfileAPI());
    })();
  }, [dispatch,userLogin]);

  const handleMenuClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <>
          {userLog !== null ? (
            <>
              <p key="hello" onClick={() => handleMenuClick(getStoreJSON(USER_LOGIN) ? "/Profile" : "/login")}>
                <span className="text-base font-medium m-0">{`Hello ${userLog.name}`}</span>
              </p>
              <p key="history" onClick={() => handleMenuClick(getStoreJSON(USER_LOGIN) ? "/Profile" : "/login")}>
                <span className="text-base mt-3">Lịch sử đặt vé</span>
              </p>
            </>
          ) : (
            <p key="register" onClick={() => handleMenuClick("/register")} style={{paddingRight: "100px"}}>
              <span className="text-lg font-medium m-0 ">Đăng ký</span>
            </p>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          {userLog !== null ? (
            <p key="logout" onClick={handleLogout} style={{ borderBottom: "1px solid #ccc" }}>
              <span className="text-lg m-0 pb-2 pt-2">Đăng xuất</span>
            </p>
          ) : (
            <p key="login" onClick={() => handleMenuClick("/login")} style={{ borderBottom: "1px solid #ccc" }}>
              <span className="text-base m-0 pb-2 pt-2">Đăng nhập</span>
            </p>
          )}
        </>
      ),
    },
    {
      key: "3",
      label: (
        <p key="admin" onClick={() => handleMenuClick(userProfile?.role === "ADMIN" ? "/admin/dashboard" : "/")}>
          <span className="text-base m-0 py-1">Đi đến trang quản trị</span>
        </p>
      ),
    },
    {
      key: "4",
      label: <p key="rent" className="text-base m-0 py-1">Cho thuê nhà</p>,
    },
    {
      key: "5",
      label: <p key="experience" className="text-base m-0 py-1">Tổ chức trải nghiệm</p>,
    },
    {
      key: "6",
      label: <p key="help" className="text-base m-0 py-1">Trợ giúp</p>,
    },
  ];

  return (
    <Dropdown menu={{items: menuItems}} trigger={["click"]} className="w-30 rounded-xl py-2.5 mt-2.5 shadow-b-3">
      <Button className="flex text-gray-500 items-center py-6 px-4">
        <FaBars className="text-lg mr-3" />
        <div>
          <img
            className="rounded-full w-8 h-8"
            src={
              userProfile?.avatar
                ? userProfile.avatar
                : "./images/avata1.jpg"
            }
           alt=""
          />
        </div>
        <DownOutlined className="ml-2" />
      </Button>
    </Dropdown>
  );
}
