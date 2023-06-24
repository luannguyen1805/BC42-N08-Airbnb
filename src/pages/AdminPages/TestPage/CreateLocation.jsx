import { Button, Form, Input, Image, notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLocationApi } from "../../../redux/Reducers/locationReducer";
import { useNavigate } from "react-router-dom";
import "./Btn.scss"

export default function CreateLocation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");

  const onFinish = async (values) => {
    values.id = 0;
    values.hinhAnh = image;
    console.log(values);
    if (values) {
      await dispatch(createLocationApi(values));
      notification.success({
        message: "Thêm vị trí thành công",
      });
    }
    navigate("/admin/dashboard/locationAdmin");
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
      autoComplete="off"
    >
      <Form.Item
        label="Địa danh"
        name="tenViTri"
        rules={[{ required: true, message: "Chưa nhập địa danh!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tỉnh Thành"
        name="tinhThanh"
        rules={[{ required: true, message: "Chưa nhập tỉnh thành" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Quốc Gia"
        name="quocGia"
        rules={[{ required: true, message: "Chưa nhập quốc gia" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={hanldeChangeImage} />
        <Image src={image} style={{ padding: "50px", border: "1px solid" }} alt="pic" className="mt-1"/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="create-user-submit-button">
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}
