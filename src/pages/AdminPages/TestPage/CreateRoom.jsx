import {
    Button,
    Form,
    Input,
    Switch,
    Image,
    notification,
    InputNumber,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewRoom } from "../../../redux/Reducers/roomReducer";
import { useNavigate } from "react-router-dom";
import "./Btn.scss"

export default function CreateRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState("");

    const onFinish = async (values) => {
        values.id = 0;
        values.hinhAnh = image;
        console.log(values);
        if (values) {
            await dispatch(createNewRoom(values));
            console.log(values);
            notification.success({
                message: "Thêm thông tin phòng thành công",
            });
        }
        navigate("/admin/dashboard/roomAdmin");
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const hanldeChangeImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setImage(event.target.result);
        };
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Mã vị trí"
                name="maViTri"
                rules={[{ required: true, message: "Chưa nhập mã vị trí" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tên phòng"
                name="tenPhong"
                rules={[{ required: true, message: "Chưa nhập tên phòng" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Hành khách thuê"
                name="khach"
                rules={[{ required: true, message: "Chưa nhập hành khách ở thuê" }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Phòng Ngủ"
                name="phongNgu"
                rules={[{ required: true, message: "Chưa nhập số phòng ngủ" }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Giường"
                name="giuong"
                rules={[{ required: true, message: "Chưa nhập số giường" }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Phòng Tắm"
                name="phongTam"
                rules={[{ required: true, message: "Chưa nhập số phòng tắm" }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Mô tả"
                name="moTa"
                rules={[{ required: true, message: "Chưa nhập mô tả!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Giá Tiền"
                name="giaTien"
                rules={[{ required: true, message: "Chưa nhập giá tiền!" }]}
            >
                <Input />
            </Form.Item>
            <div className="flex justify-start ml-28 ">
                <div className="mr-24">
                    <Form.Item label="Máy giặt" name="mayGiat" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch className="fix_icon"
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Bàn Là" name="banLa" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Ti Vi" name="tivi" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Điều hòa" name="dieuHoa" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Wifi" name="wifi" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label="Bếp" name="bep" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Đỗ xe" name="doXe" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Hồ bơi" name="hoBoi" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Bàn ủi" name="banUi" valuePropName="checked" labelCol={{ span: 16 }}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                </div>
            </div>
            <Form.Item label="Hình ảnh">
                <Input type="file" name="hinhAnh" onChange={hanldeChangeImage} />
                <Image
                    src={image}
                    style={{ padding: "50px" , border: "1px solid" }}
                    alt="pic"
                    onChange={hanldeChangeImage}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="create-user-submit-button">
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
}
