import { Table, Input, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoom, deleteRoomApi } from "../../../redux/Reducers/roomReducer";

export default function RoomManagement() {
    const dispatch = useDispatch();

    const [searchState, setSearchState] = useState([]);

    useEffect(() => {
        dispatch(getAllRoom());
    }, []);

    const { roomArray } = useSelector((state) => state.roomReducer);

    const navigate = useNavigate();

    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                navigate("createroom");
                return newLoadings;
            });
        }, 1000);
    };

    const { Search } = Input;

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            width: "1%",
        },
        {
            title: "Mã vị trí",
            dataIndex: "maViTri",
            width: "3%",
            sortDirections: ["descend"],
        },
        {
            title: "Tên phòng",
            dataIndex: "tenPhong",
            width: "10%",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            width: "5%",
            render: (text) => {
                return <img src={text} style={{ width: 70, height: 50 }} />;
            },
        },
        {
            title: "Người thuê ",
            dataIndex: "khach",
            width: "5%",
            defaultSortOrder: "descend",
            //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Giá tiền ",
            dataIndex: "giaTien",
            width: "5%",
            defaultSortOrder: "descend",
            //   sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Tương tác",
            dataIndex: "tuongTac",
            width: "5%",
            render: (id, name) => {
                return (
                    <div className="flex justify-center text-white">
                        <span
                            onClick={() => {
                                navigate(`updateroom/${id}`);
                            }}
                            className="inline-block py-1 px-2 bg-green-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-600 mx-2"
                        >
                            Xem & Sửa
                        </span>
                        <span
                            onClick={async () => {
                                await dispatch(deleteRoomApi(id));
                                window.location.reload();
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

    const data = roomArray?.map((ele, index) => {
        return {
            key: index + 1,
            id: ele.id,
            tenPhong: ele.tenPhong,
            khach: ele.khach,
            phongNgu: ele.phongNgu,
            giuong: ele.giuong,
            phongTam: ele.phongTam,
            moTa: ele.moTa,
            giaTien: ele.giaTien,
            mayGiat: ele.mayGiat,
            banLa: ele.banLa,
            tivi: ele.tivi,
            dieuHoa: ele.dieuHoa,
            wifi: ele.wifi,
            bep: ele.bep,
            doXe: ele.doXe,
            hoBoi: ele.hoBoi,
            banUi: ele.banUi,
            maViTri: ele.maViTri,
            hinhAnh: ele.hinhAnh,
            tuongTac: ele.id,
        };
    });

    const onSearch = (value) => {
        console.log(value);
        let searchData = data.filter((ele) => {
            return (
                ele.tenPhong
                    .toLowerCase()
                    .trim()
                    .indexOf(value.toLowerCase().trim()) !== -1
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
            <Space
                style={{ width: "100%" }}
                direction="vertical"
                className="w-100 py-3"
            >
                {/* <Button
      type="primary"
      loading={loadings[0]}
      onClick={() => enterLoading(0)}
      >
      Thêm phòng
      </Button> */}
                <Search
                    placeholder="Nhập tên phòng cần tìm"
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
