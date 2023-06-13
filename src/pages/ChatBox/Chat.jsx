import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Layout } from "antd";
import { AiOutlineCloseCircle, AiFillMessage } from "react-icons/ai";
import { CURRENT_USER, getStoreJSON } from "../../utils/setting";
import { allUsersRoute, getUserAdmin, host } from "../../utils/APIRoutes";
import SilderAdminUser from "../../components/ChatBoxComponents/SilderAdminUser";
import ChatContainer from "../../components/ChatBoxComponents/ChatContainer";
const { Header, Sider } = Layout;

export default function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [currentChat, setCurrentChat] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [allUser, setAllUser] = useState();
    const [isLoadInterface, setIsLoadInterface] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let currentUser = getStoreJSON(CURRENT_USER);
        if (currentUser) {
            if (currentUser.role === "ADMIN") {
                setIsLoadInterface(true);
            } else {
                setIsLoadInterface(false);
            }
        }
    }, []);

    useEffect(() => {
        (async function getAllUsers() {
            try {
                let getUser = await axios.get(allUsersRoute);
                let setUser = getUser?.data.map((user) => {
                    return { ...user, active: false };
                });
                setAllUser(setUser);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!getStoreJSON(CURRENT_USER)) {
                // navigate("/login/1");
            } else {
                setCurrentUser(await getStoreJSON(CURRENT_USER));
            }
        })();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser.id);
        }
    }, [currentUser]);

    const handleSelectUser = async (userSelect) => {
        if (currentUser?.role === "ADMIN") {
            let allUserNew = allUser.map((user) => {
                if (user.id === userSelect.id) {
                    return { ...user, active: true };
                } else {
                    return { ...user, active: false };
                }
            });
            setAllUser(allUserNew);
            setCurrentChat(userSelect);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                let currentUser = getStoreJSON(CURRENT_USER);
                if (currentUser.role === "USER") {
                    let admin = await axios.get(getUserAdmin);
                    setCurrentChat(admin.data);
                    console.log(admin.data);
                } else {
                    setIsOpen(true);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <div className={isLoadInterface ? "" : "heightBoxChat"}>
                {isOpen ? (
                    <Layout>
                        {isLoadInterface ? (
                            <Sider className="">
                                <SilderAdminUser
                                    arrUser={allUser}
                                    handleSelectUser={handleSelectUser}
                                />
                            </Sider>
                        ) : (
                            ""
                        )}
                        <Layout className="bg-White">
                            {isLoadInterface ? (
                                <Header className="bg-slate-600 flex items-center gap-4 ">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img
                                            src="https://i.pravatar.cc/300"
                                            alt="..."
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <p className="text-lg font-semibold text-lime-600">
                                        {currentChat?.username}
                                    </p>
                                </Header>
                            ) : (
                                <Header className="bg-slate-600 flex items-center justify-between p-0 px-4 rounded-tl-xl rounded-tr-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <img
                                                src="https://i.pravatar.cc/300"
                                                alt="..."
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <p className="text-lg font-semibold text-lime-600">
                                            {currentUser?.username}
                                        </p>
                                    </div>
                                    <button className="text-3xl text-slate-100 " onClick={() => setIsOpen(false)}>
                                        <AiOutlineCloseCircle />
                                    </button>
                                </Header>
                            )}
                            <ChatContainer currentChat={currentChat} socket={socket} />
                        </Layout>
                    </Layout>
                ) : (
                    <button className="text-4xl fixed z-50 right-1 bottom-4" onClick={() => setIsOpen(true)}>
                        <AiFillMessage />
                    </button>
                )}
            </div>
        </>
    );
}
