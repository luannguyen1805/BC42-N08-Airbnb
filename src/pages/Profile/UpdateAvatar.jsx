import { Card, Form, Input, Modal, Image, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../redux/Reducers/userAdminReducer";
import { updateAvatarUser } from "../../redux/Reducers/userReducer";

export default function UpdateAvatar() {
    const params = useParams();
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState();
    const [file, setFile] = useState();

    useEffect(() => {
        if (params.userId) {
            dispatch(getUserById(+params.userId));
        }
    }, [params.userId]);

    const { userAvatar } = useSelector(
        (state) => state.userAdminReducer
    );

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { userProfile } = useSelector((state) => state.userReducer);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        const formData = new FormData();

        file && formData.append("formFile", file, file.name);

        dispatch(updateAvatarUser(formData));

        setOpen(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const handleChangeAvatar = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file);
        };
    };

    return (
        <div>
            <div className="mx-auto">
                <img
                    className="h-44 w-44 rounded-full mx-auto"
                    alt="example"
                    src={userAvatar?.avatar || userProfile.avatar}
                />
                <button
                    className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-sm px-3 py-3 mt-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-60 text-center"
                    onClick={showModal}
                >
                    Thay ảnh đại diện
                </button>
            </div>
            <Modal
                title="Thay ảnh đại diện"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item>
                        <Input type="file" onChange={handleChangeAvatar} />
                    </Form.Item>
                    <Image src={avatar} />
                </Form>
            </Modal>
        </div>
    );
}
