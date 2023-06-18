import React, { useEffect } from "react"
import {
    BsHouseDoor,
    BsFillPersonLinesFill,
} from "react-icons/bs"
import { FiUser } from "react-icons/fi"
import { IoMdArrowDropdown } from "react-icons/io"
import { MdShareLocation } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Dropdown, Menu } from "antd"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { ACCESS_TOKEN, USER_LOGIN } from "../../../utils/setting"
import { getUserProfileAPI } from "../../../redux/Reducers/userReducer"
import { AiFillSignal } from "react-icons/ai"

export default function DashBoard({ }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type
        }
    }
    const { userProfile } = useSelector(state => state.userReducer)
    useEffect(() => {
        dispatch(getUserProfileAPI())
    }, [])

    const handleLogout = () => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(ACCESS_TOKEN);
        navigate("/");
        window.location.reload();
    };

    const onClick = e => {
        switch (e.key) {
            case "1":
                {
                    navigate("userAdmin")
                }
                break
            case "2":
                {
                    navigate("userAdmin/createUser")
                }
                break
            case "5":
                {
                    navigate("locationAdmin")
                }
                break
            case "6":
                {
                    navigate("locationAdmin/createLocation")
                }
                break
            case "9":
                {
                    navigate("roomAdmin")
                }
                break
            case "10":
                {
                    navigate("roomAdmin/Createroom")
                }
                break
            case "11":
                {
                    navigate("bookingAdmin")
                }
                break
            case "12":
                {
                    navigate("DashBoardInfor")
                }
                break

            default:
                break
        }
    }

    const menu = [
        {
            key: "1",
            label: (
                <p
                    onClick={() => navigate("/")}
                    className="flex items-center text-base p-2"
                >
                    <span>Quay lại trang chủ</span>
                </p>
            ),
        },
        {
            key: "2",
            label: (
                <div
                    onClick={handleLogout}
                    className="flex items-center text-base p-2"
                >
                    <span>Đăng xuất</span>
                </div>
            ),
        },
    ];
    const items = [
        getItem("Tổng quan", "Sub0", <AiFillSignal />, [
            getItem("Thông tin tổng quan", "12")
        ]),
        getItem("Quản lí người dùng", "sub1", <FiUser />, [
            getItem("Danh sách người dùng", "1"),
            getItem("Them người dùng", "2")
        ]),
        getItem("Quản lí vị trí", "sub2", <MdShareLocation />, [
            getItem("Danh sách vị trí", "5"),
            getItem("Thêm vị trí", "6")
        ]),
        getItem("Quản lí phòng", "sub3", <BsHouseDoor />, [
            getItem("Danh sách phòng", "9"),
            getItem("Thêm phòng", "10")
        ]),
        getItem("Quản lí đặt phòng ", "sub4", <BsFillPersonLinesFill />, [
            getItem("Danh sách đặt phòng", "11")
        ]),
    ]

    return (
        <div className="grid grid-cols-12 admin ">
            <div className="col-span-2  ">
                <div className="h-full admin_slidebar">
                    <div
                        className="h-20 px-5 py-4 flex items-center "
                        style={{ boxShadow: " 0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="h-12 w-12 rounded-xl overflow-hidden">
                            <img
                                className="h-full w-full"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-0CXiCSzYB7Qls6acs-5VZHEewRNH3DUyA&usqp=CAU"
                                alt=""
                            />
                        </div>
                        <span className="text-2xl font-semibold ml-2 text-rose-400">
                            Airbnb Admin
                        </span>
                    </div>
                    <div className="mt-10">
                        <Menu
                            onClick={onClick}
                            style={{
                                width: 254
                            }}
                            defaultSelectedKeys={["12"]}
                            defaultOpenKeys={["sub0"]}
                            mode="inline"
                            items={items}
                        />
                        ,
                    </div>
                </div>
            </div>
            <div className="col-span-10 ">
                <div>
                    <div
                        className="h-20 px-8  flex items-center justify-end"
                        style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="flex items-center">
                            <p className="text-base font-medium mr-5">{`Hello ${userProfile?.name}`}</p>
                            <Dropdown menu={{ items: menu }} trigger={["click"]} placement="bottomRight" arrow>
                                <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                                    <img
                                        className="rounded-full w-8 h-8"
                                        src={
                                            userProfile?.avatar
                                                ? userProfile.avatar
                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-0CXiCSzYB7Qls6acs-5VZHEewRNH3DUyA&usqp=CAU"
                                        }
                                        alt=""
                                    />
                                </div>
                            </Dropdown>
                            <span>
                                <IoMdArrowDropdown className="text-2xl" />
                            </span>
                        </div>
                    </div>
                    <div className=" px-8 mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
