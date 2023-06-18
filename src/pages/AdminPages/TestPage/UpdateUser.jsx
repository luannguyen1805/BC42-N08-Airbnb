import React, { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Form,
    Input,
    DatePicker,
    Select,
    Image,
    notification,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser, setUserUpdate } from "../../../redux/Reducers/userAdminReducer";
import "./Btn.scss"

export default function UpdateUser() {
    const param = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [sendfile, setSendfile] = useState();
    const [form] = Form.useForm();
    const { Option } = Select;
    const onChange = (date, dateString) => {
        // console.log(moment(date).format("DD/MM/YYYY"));
    };
    const { userUpdate } = useSelector((state) => state.userAdminReducer);
    console.log(userUpdate);

    useEffect(() => {
        dispatch(getUserById(param.id));
      }, [dispatch, param.id]);
    
      useEffect(() => {
        if (userUpdate) {
          form.setFieldsValue({
            ...userUpdate,
            birthday: moment(userUpdate.birthday, "DD-MM-YYYY"),
          });
        }
      }, [form, userUpdate]);
    
      const onFinish = async (values) => {
        values.birthday = values.birthday.format("DD/MM/YYYY");
        try {
          if (values) {
            await dispatch(updateUser(param.id, values));
            // Cập nhật giá trị userUpdate
            dispatch(setUserUpdate(values));
            notification.success({
              message: "Cập nhật người dùng thành công",
            });
            navigate("/admin/dashboard/userAdmin");
          }
        } catch (error) {
          notification.error({
            message: `${error}`,
          });
        }
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

    console.log(userUpdate);


    let allowedDateFormats = [
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
                role: "",
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
                {/* <Input /> */}
            </Form.Item>
            <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Chưa chọn giới tính!" }]}
            >
                <Select style={{ width: 120 }} onChange={handleChangeOne}>
                    <Option value={true}>Nam</Option>
                    <Option value={false}>Nữ</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Loại người dùng"
                name="role"
                rules={[{ required: true, message: "Chưa chọn loại người dùng!" }]}
            >
                <Select style={{ width: 120 }} onChange={handleChangeTwo}>
                    <Option value="ADMIN">ADMIN</Option>
                    <Option value="USER">USER</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <Input type="file" onChange={hanldeChangeImage} />
                <Image
                    src={image}
                    style={{ padding: "50px" }}
                    alt=""
                    onChange={hanldeChangeImage}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="create-user-submit-button">
                <Button type="primary" htmlType="submit">Update</Button>
            </Form.Item>
        </Form>
    );
}