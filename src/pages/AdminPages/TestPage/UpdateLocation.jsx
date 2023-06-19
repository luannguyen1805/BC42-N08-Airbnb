import React, { useEffect, useState } from "react"
import { Button, Form, Input, Image, notification } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
    getLocationDetailById,
    putlocationApi
} from "../../../redux/Reducers/locationReducer"
import "./Btn.scss"

export default function UpdateLocation() {
    const [form] = Form.useForm()
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [image, setImage] = useState("")
    //   const [sendfile, setSendfile] = useState<string>();
    const { locationPut } = useSelector(state => state.locationReducer);
    console.log(locationPut);
    useEffect(() => {
        dispatch(getLocationDetailById(params.id))
    }, [params.id])
    
    useEffect(() => {
        if (locationPut) {
            form.setFieldsValue({
                ...locationPut,
                hinhAnh: setImage(locationPut.hinhAnh)
            })
        }
    }, [locationPut])

    console.log(params?.id);
    console.log(locationPut);
    const onFinish =  values => {
        values.hinhAnh = image
        if (values) {
            dispatch(putlocationApi({ id: params?.id, data: { ...values }}));
            
            notification.success({
                message: "Thêm vị trí thành công"
            })
        }
        navigate("/admin/dashboard/locationAdmin")
    }

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo)
    }

    const hanldeChangeImage = event => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = event => {
            setImage(event.target.result)
           
        }
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            
                label="ID"
                name="id"
                rules={[{ required: true, message: "Chưa nhập ID!" }]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                label="Địa danh"
                name="tenViTri"
                rules={[{ required: true, message: "Chưa nhập tên!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Tỉnh Thành"
                name="tinhThanh"
                rules={[{ required: true, message: "Chưa nhập mật khẩu!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Quốc Gia"
                name="quocGia"
                rules={[{ required: true, message: "Chưa nhập số điện thoại!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <Input type="file" name="hinhAnh" onChange={hanldeChangeImage} />
                <Image
                    src={image}
                    style={{ padding: "50px" }}
                    alt="pic"
                    onChange={hanldeChangeImage}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="create-user-submit-button">
                <Button type="primary" htmlType="submit">Update</Button>
            </Form.Item>
        </Form>
    )
}
