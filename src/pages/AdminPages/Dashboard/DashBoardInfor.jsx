import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Typography } from "antd";
import { FaHouseUser, FaTicketAlt, FaUserEdit } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { getUserApi } from "../../../redux/Reducers/userAdminReducer";
import { getAllRoom } from "../../../redux/Reducers/roomReducer";
import { getLocationApi } from "../../../redux/Reducers/locationReducer";
import { getAllRoomBooking } from "../../../redux/Reducers/bookingRoomReducer";
import LineChart from "./Chart/ElineChart";
import Echart from "./Chart/Echart";

const { Title, Text } = Typography;

const DashboardInfo = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserApi());
        dispatch(getAllRoom());
        dispatch(getLocationApi());
        dispatch(getAllRoomBooking());
    }, []);

    const { arrUser = [], roomArray = [], locationList = [], roombookingList = [] } = useSelector((state) => ({
        arrUser: state.userAdminReducer.arrUser,
        roomArray: state.roomReducer.roomArray,
        locationList: state.locationReducer.locationList,
        roombookingList: state.bookingReducer.roombookingList,
    }));

    const arrUserCount = arrUser.length;
    const roomArrayCount = roomArray.length;
    const locationListCount = locationList.length;
    const roombookingListCount = roombookingList.length;

    const dollorIcon = <FaUserEdit />;
    const profileIcon = <FaHouseUser />;
    const heartIcon = <GrMapLocation />;
    const cartIcon = <FaTicketAlt />;

    const count = [
        {
            today: "Người dùng",
            title: arrUserCount,
            percent: "+10%",
            icon: dollorIcon,
            bnb: "bnb2",
        },
        {
            today: "Khách sạn",
            title: roomArrayCount,
            percent: "+20%",
            icon: profileIcon,
            bnb: "bnb2",
        },
        {
            today: "Vị trí",
            title: locationListCount,
            percent: "+20%",
            icon: heartIcon,
            bnb: "redtext",
        },
        {
            today: "Đặt vé",
            title: roombookingListCount,
            percent: "+10%",
            icon: cartIcon,
            bnb: "bnb2",
        },
    ];

    return (
        <div className="layout-content w-full mx-auto">
            <Row className="mx-4" gutter={[24, 0]} style={{ marginLeft: "0px", marginTop: "0px" }}>
                {count.map((c, index) => (
                    <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
                        <Card bordered={false} className="criclebox ">
                            <div className="number bg-sky-50 rounded-2xl w-full h-32 mt-10 pl-1 pr-1 shadow-slate-300 shadow-lg">
                                <Row align="middle" gutter={[24, 0]} className="w-full">
                                    <Col xs={18} className="mt-7">
                                        <span className="text-neutral-500 text-2xl font-bold ml-5 leading-normal">{c.today}</span>
                                        <Title level={3}>
                                            <span className="ml-5 text-2xl"> {c.title} </span>
                                            <span className="text-lime-400 ml-2 text-xl">{c.percent}</span>
                                        </Title>
                                    </Col>
                                    <Col xs={6} className="mt-7 ">
                                        <div className="icon-box w-14 h-14 rounded-full mx-auto bg-gray-50 relative">
                                            <span className="text-4xl absolute top-2 right-2">{c.icon}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24 bg-sky-50 py-3 shadow-slate-300 shadow-lg ml-0">
                    <Card bordered={false} className="criclebox h-full">
                        <Echart />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24 bg-sky-50 py-3 shadow-slate-300 shadow-lg">
                    <Card bordered={false} className="criclebox h-full">
                        <LineChart />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardInfo;