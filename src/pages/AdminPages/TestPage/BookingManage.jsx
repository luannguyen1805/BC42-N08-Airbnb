import { Table, Input, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomBooking, deleteRoomBookingApi } from "../../../redux/Reducers/bookingRoomReducer";
import Search from "antd/lib/input/Search";

export default function BookingManagement() {

    const [searchState, setSearchState] = useState([]);

    const dispatch = useDispatch();
    const { roombookingList } = useSelector(
        (state) => state.bookingReducer
    );
    useEffect(() => {
        dispatch(getAllRoomBooking());
    }, []);

    const navigate = useNavigate();

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            width: "5%",
        },
        {
            title: "Mã Phòng",
            dataIndex: "maPhong",
            width: "5%",
            sortDirections: ["descend"],
        },
        {
            title: "Ngày Đến",
            dataIndex: "ngayDen",
            width: "10%",
        },
        {
            title: "Ngày Đi",
            dataIndex: "ngayDi",
            width: "10%",
        },
        {
            title: "Số lượng khách",
            dataIndex: "soLuongKhach",
            width: "5%",
            defaultSortOrder: "descend",
        },
        {
            title: "Mã người dùng ",
            dataIndex: "maNguoiDung",
            width: "5%",
            defaultSortOrder: "descend",
        },
        {
            title: "Tương tác",
            dataIndex: "tuongTac",
            width: "5%",
            render: (id, name) => {
                return (
                    React.createElement("div", { className: "flex justify-center text-white" },
                        React.createElement("span", {
                            onClick: () => {
                                navigate(`updatebooking/${id}`);
                            },
                            className: "inline-block py-1 px-2 bg-green-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-600 mx-2"
                        }, "Thay đổi"),
                        React.createElement("span", {
                            onClick: async () => {
                                await dispatch(deleteRoomBookingApi(id));
                                window.location.reload();
                            },
                            className: "inline-block py-1 px-2 bg-red-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-600"
                        }, "Xóa")
                    )
                );
            },
        },
    ];

    const data = roombookingList?.map((ele, index) => {
        return {
            key: index + 1,
            id: ele.id,
            maPhong: ele.maPhong,
            ngayDen: ele.ngayDen,
            ngayDi: ele.ngayDi,
            soLuongKhach: ele.soLuongKhach,
            maNguoiDung: ele.maNguoiDung,
            tuongTac: ele.id,
        };
    });

    const onSearch = (value) => {
        let newValue = Number(value);
        let searchData = data.filter((ele) => {
            return ele.maPhong === newValue;
        });
        console.log(searchData);

        setSearchState(searchData);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log("params", pagination, filters, sorter, extra);
    };
    return (
        React.createElement(React.Fragment, null, React.createElement(Space, {
            style: { width: "100%" },
            direction: "vertical",
            className: "w-100 py-3"
        },
            React.createElement(Search, {
                placeholder: "Nhập mã phòng cần tìm kiếm ",
                onSearch: onSearch,
                enterButton: true,
                allowClear: true
            })
        ),
            React.createElement(Table, {
                columns: columns,
                dataSource: searchState.length > 0 ? searchState : data,
                onChange: onChange
            })
        )
    )
}

