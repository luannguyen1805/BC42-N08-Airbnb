import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, Select, notification } from "antd";
import moment from "moment";
import { createUser } from "../../../redux/Reducers/userAdminReducer";
import "./Btn.scss"

const { Option } = Select;

export default function CreateUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [sendfile, setSendfile] = useState();
    const [form] = Form.useForm();

    const formData = new FormData();

    const onChange = (date, dateString) => {
        console.log(moment(date).format("DD/MM/YYYY"));
    };

    const onFinish = async (values) => {
        values.birthday = values.birthday.format("DD/MM/YYYY");
        if (values) {
            await dispatch(createUser(values));
            notification.success({
                message: "Thêm người dùng thành công",
            });
        }
        navigate("/admin/dashboard/userAdmin");
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleChangeOne = (value) => {
        console.log(`selected ${value}`);
    };

    const handleChangeTwo = (value) => {
        console.log(`selected ${value}`);
    };

    const hanldeChangeImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setImage(event.target.result);
            setSendfile(file);
        };
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };


    const allowedDateFormats = [
        "DD/MM/YYYY",
        "D/M/YYYY",
        "DD.MM.YYYY",
        "D.M.YYYY",
        "DD. MM. YYYY",
        "D. M. YYYY",
        "DD-MM-YYYY",
    ];

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{
                name: "",
                email: "",
                password: "",
                phone: "",
                birthday: "",
                avatar: "",
                gender: false,
                role: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: "Chưa nhập tên!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Chưa nhập mật khẩu!" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Chưa nhập email!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[{ required: true, message: "Chưa nhập ngày sinh!" }]}
            >
                <DatePicker onChange={onChange} format={allowedDateFormats} />
            </Form.Item>

            <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Chưa chọn giới tính!" }]}
                hasFeedback
                validateStatus="success"
            >
                <Select style={{ width: 120 }} onChange={handleChangeOne}>
                    <Option value="true">Nam</Option>
                    <Option value="false">Nữ</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Loại người dùng"
                name="role"
                rules={[{ required: true, message: "Chưa chọn loại người dùng!" }]}
            >
                <Select style={{ width: 120 }} onChange={handleChangeTwo}>
                    <Option value="ADMIN">Admin</Option>
                    <Option value="USER">User</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Hình ảnh">
                <Input type="file" onChange={hanldeChangeImage} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="create-user-submit-button">
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
}
