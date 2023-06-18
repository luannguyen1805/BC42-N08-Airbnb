import { Table, Input, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getPaginationUser } from "../../../redux/Reducers/userAdminReducer";
import { deleteUser } from "../../../redux/Reducers/userAdminReducer";

export default function UserManagement() {
    const dispatch = useDispatch();
    const [searchState, setSearchState] = useState([]);
    const { arrUser } = useSelector((state) => state.userAdminReducer);
    useEffect(() => {
        dispatch(getAllUser());
    }, []);
    const navigate = useNavigate();
    const { Search } = Input;

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            width: "5%",
            sorter: (a, b) => a.id - b.id,
            sortDirections: ["descend"],
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            width: "10%",
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend"],
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "10%",
            defaultSortOrder: "descend",
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            width: "5%",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            width: "7%",
            render: (text) => {
                return <>{text === true ? <span>Nam</span> : <span>Nữ</span>}</>;
            },
        },
        {
            title: "Quyền",
            dataIndex: "role",
            width: "5%",
            filters: [
                {
                    text: "ADMIN",
                    value: "ADMIN",
                },
                {
                    text: "USER",
                    value: "USER",
                },
            ],
            onFilter: (value, record) => record.role.indexOf(value) === 0,
        },
        {
            title: "Tương tác",
            dataIndex: "tuongTac",
            width: "7%",
            render: (id, name) => {
                return (
                    <div className="flex justify-center text-white">
                        <span
                            onClick={() => {
                                navigate(`updateuser/${id}`);
                            }}
                            className="inline-block py-1 px-2 bg-green-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-600 mx-2 "
                        >
                            Xem & Sửa
                        </span>
                        <span
                            onClick={async () => {
                                await dispatch(deleteUser(id));
                                dispatch(getAllUser())
                            }}
                            className="inline-block py-1 px-2 bg-red-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-600"
                        >
                            Xóa
                        </span>
                    </div>
                );
            },
        },
    ];

    const data = arrUser ? arrUser.map((ele, index) => ({
        key: index + 1,
        id: ele.id,
        name: ele.name,
        email: ele.email,
        password: ele.password,
        phone: ele.phone,
        birthday: ele.birthday,
        avatar: ele.avatar,
        gender: ele.gender,
        role: ele.role,
        tuongTac: ele.id,
      })) : [];

    const onSearch = (value) => {
        console.log(value);
        let searchData = data.filter((ele) => {
            return (
                ele.name.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !== -1
            );
        });
        console.log(searchData);

        setSearchState(searchData);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <>
            <Space direction="vertical" className="w-1/2 py-3 rounded-sm">
                <Search
                    placeholder="Nhập họ tên cần tìm"
                    onSearch={onSearch}
                    enterButton
                    allowClear
                />
            </Space>
            <Table
                columns={columns}
                dataSource={searchState.length > 0 ? searchState : data}
                onChange={onChange}
            />
        </>
    );
}
