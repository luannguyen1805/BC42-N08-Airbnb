import {
    Button,
    Form,
    Input,
    DatePicker,
    notification,
    InputNumber
} from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import { getRoomBookingApiID, putRoomBookingApi } from "../../../redux/Reducers/bookingRoomReducer";

import "./Btn.scss"

export default function UpdateBooking() {
    const params = useParams()
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { roombookingPut } = useSelector(state => state.bookingReducer)
    console.log(roombookingPut)

    useEffect(() => {
        dispatch(getRoomBookingApiID(params?.id))
    }, [])
    useEffect(() => {
        if (roombookingPut) {
            form.setFieldsValue({
                ...roombookingPut,
                ngayDen: moment(roombookingPut.ngayDen),
                ngayDi: moment(roombookingPut.ngayDi)
            })
        }
    }, [form, roombookingPut])

    const onFinish = values => {
        values.id = 0;
        if (values) {
            //dispatch(putRoomBookingApi(params?.id, values));
            dispatch(putRoomBookingApi({ id: params?.id, data: { ...values } }));
            notification.success({
                message: "Cập nhật đặt phòng thành công"
            })
        }
        navigate("/admin/dashboard/bookingAdmin")
    }

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo)
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
                label="Mã phòng"
                name="maPhong"
                rules={[{ required: true, message: "Chưa mã phòng!" }]}
            >
                <Input disabled/>
            </Form.Item>

            <Form.Item
                label="Ngày Đến"
                name="ngayDen"
                rules={[{ required: true, message: "Chưa nhập ngày đến " }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Ngày đi"
                name="ngayDi"
                rules={[{ required: true, message: "Chưa nhập ngày bắt đầu" }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Số lượng khách"
                name="soLuongKhach"
                rules={[{ required: true, message: "Chưa nhập số lượng khách" }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Mã người dùng"
                name="maNguoiDung"
                rules={[{ required: true, message: "Chưa nhập mã người dùng" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
                className="create-user-submit-button"
            >
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}
