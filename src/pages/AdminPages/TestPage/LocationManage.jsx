import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import {
    EditOutlined,
    SolutionOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocationApi } from "../../../redux/Reducers/locationReducer";
import { deletelocationApi } from "../../../redux/Reducers/locationReducer";

export default function LocationManagement() {
    const dispatch = useDispatch();
    const { locationList } = useSelector((state) => state.locationReducer);

    useEffect(() => {
        dispatch(getLocationApi());
    }, []);

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
                navigate("createlocation");
                return newLoadings;
            });
        }, 1000);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            width: "5%",
        },
        {
            title: "Địa danh",
            dataIndex: "tenViTri",
            width: "10%",
            sorter: (a, b) => a.tenViTri.localeCompare(b.tenViTri),
        },
        {
            title: "Tỉnh Thành",
            dataIndex: "tinhThanh",
            width: "8%",
        },
        {
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            width: "10%",
            render: (text) => {
                return <img src={text} style={{ width: 70, height: 50 }} />;
            },
        },
        {
            title: "Quốc gia",
            dataIndex: "quocGia",
            width: "5%",
            sorter: (a, b) => a.quocGia.localeCompare(b.quocGia),
        },
        {
            title: "Tương tác",
            dataIndex: "tuongTac",
            width: "5%",
            render: (id) => {
                return (
                    <div className="flex justify-center text-white">
                        <span
                            onClick={() => {
                                navigate(`updatelocation/${id}`);
                            }}
                            className="inline-block py-1 px-2 bg-green-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-600 mx-2"
                        >
                            Xem & Sửa
                        </span>
                        <span
                            onClick={async () => {
                                await dispatch(deletelocationApi(id));
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

    const data = locationList?.map((ele, index) => {
        return {
            key: index + 1,
            id: ele.id,
            tenViTri: ele.tenViTri,
            tinhThanh: ele.tinhThanh,
            quocGia: ele.quocGia,
            hinhAnh: ele.hinhAnh,
            tuongTac: ele.id,
        };
    });

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <>
            <Space style={{ width: "100%" }} direction="vertical" className="w-100 py-3">
                {/* Add any additional components or elements here */}
                {/* <Button
          type="primary"
          loading={loadings[0]}
          onClick={() => enterLoading(0)}
        >
          Thêm vị trí
        </Button> */}
                {/* <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        /> */}
            </Space>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    );
}
