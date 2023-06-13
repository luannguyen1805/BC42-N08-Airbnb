import { SiAdguard } from "react-icons/si";
import { BsCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useEffect } from "react";
import {
    getUserProfileAPI,
} from "../../redux/Reducers/userReducer";
import ModalProfile from "../../HOC/ModalProfile";
import RoomItem from "./RoomProfile/RoomItem";

import _ from "lodash";
import UpdateAvatar from "./UpdateAvatar";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";

export default function Profile() {
    const dispatch = useDispatch();
    const { userProfile } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(getUserProfileAPI());
    }, []);

    return (
        <div>
            <div className="xl:max-w-7xl mx-auto py-24 pt-28 flex justify-center">
                <div className="border-solid border-[5px] w-1/4 pt-10 rounded-xl h-3/4 ">
                    <div className="flex flex-col items-center">
                        <UpdateAvatar />
                    </div>
                    <div className="px-5 pt-10 leading-10">
                        <div>
                            <SiAdguard />
                        </div>
                        <div className="border-solid border-b-[1px]">
                            <h3 className="font-medium">Xác minh danh tính</h3>
                            <p className="leading-5 pb-5">
                                Xác thực danh tính của bạn với huy hiệu xác minh danh tính
                            </p>
                            <button className="border-solid border-[1px] border-black px-5 rounded-xl font-medium mb-5">
                                Nhận Huy Hiệu
                            </button>
                        </div>
                        <div>
                            <h1>{userProfile?.email} - Đã xác nhận</h1>
                            <div className="flex items-center">
                                <BsCheck className="text-2xl" />
                                <span className="pl-1">Địa chỉ email</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-20 w-3/5">
                    <div className="leading-8 mx-auto">
                        <h1 className="text-3xl font-semibold">
                            Xin Chào, tôi là {userProfile?.name}
                        </h1>
                        <span>Bắt đầu tham gia vào 2023</span>
                        <div
                            className="w-4/6 p-6 rounded-2xl py-4"
                            style={{ border: "2px solid #ff385c" }}
                        >
                            <div className="">
                                <p className="text-base">
                                    <span
                                        className=" font-medium inline-block"
                                        style={{ width: "100px" }}
                                    >
                                        Họ và tên :
                                    </span>
                                    <span>{userProfile?.name}</span>
                                </p>
                                <p className="text-base">
                                    <span
                                        className=" font-medium inline-block"
                                        style={{ width: "100px" }}
                                    >
                                        Giới tính :{" "}
                                    </span>
                                    <span>{userProfile?.gender ? "Nam" : "Nữ"}</span>
                                </p>
                                <p className="text-base">
                                    <span
                                        className=" font-medium inline-block"
                                        style={{ width: "100px" }}
                                    >
                                        Ngày sinh :
                                    </span>
                                    <span>
                                        {dayjs(userProfile?.birthday).format("DD/MM/YYYY")}
                                    </span>
                                </p>
                                <p className="text-base">
                                    <span
                                        className=" font-medium inline-block"
                                        style={{ width: "100px" }}
                                    >
                                        Email :
                                    </span>
                                    <span>{userProfile?.email}</span>
                                </p>
                                <p className="text-base">
                                    <span
                                        className=" font-medium inline-block"
                                        style={{ width: "100px" }}
                                    >
                                        Điện thoại :
                                    </span>
                                    <span>{userProfile?.phone}</span>
                                </p>
                            </div>
                        </div>
                        <ModalProfile />
                    </div>
                    <div className="flex mt-5 border-solid h-2">
                        <div className="pb-4 items-center flex">
                            <MdOutlinePlaylistAddCheck className="text-center text-3xl" />
                            <span className="pl-2 font-extrabold text-slate-700 text-lg">Phòng bạn đã đặt</span>
                        </div>
                    </div>
                    {/* Booking */}
                    <RoomItem />
                </div>
            </div>
        </div>
    );
}
