import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Layout } from "antd";
import InputChat from "./InputChat";
import ContentChat from "./ContentChat";
import { CURRENT_USER, getStoreJSON } from "../../utils/setting";
import { receiveMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";
const { Footer, Content } = Layout;

export default function ChatContainer({ currentChat, socket }) {
  const [arrMessage, setArrMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [currentUser, setCurrentUser] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        let currentUser = getStoreJSON(CURRENT_USER);
        setCurrentUser(currentUser);
        if (currentUser && currentChat) {
          const response = await axios.post(receiveMessageRoute, {
            from: currentUser.id,
            to: currentChat.id,
          });
          setArrMessage(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    let currentUser = getStoreJSON(CURRENT_USER);
    if (msg) {
      socket.current.emit("send-msg", {
        to: currentChat.id,
        from: currentUser.id,
        msg,
      });
      await axios.post(sendMessageRoute, {
        from: currentUser.id,
        to: currentChat.id,
        message: msg,
      });

      let msgs = [...arrMessage];
      msgs.push({ fromSelf: true, message: msg });
      setArrMessage(msgs);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setArrMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [arrMessage]);

  return (
    <>
      <Content
        className={
          currentUser?.role === "user" ? "bg-slate-200 h-64" : "bg-slate-400"
        }
      >
        <div className="overflow-auto h-full px-6 mt-2">
          {arrMessage?.map((message, index) => {
            return (
              <div key={index} ref={scrollRef}>
                {message.fromSelf ? (
                  <ContentChat
                    message={message.message}
                    css={"bg-slate-100 text-black mb-2 inline-block py-1 px-3"}
                    textLeftOrRight={"text-right"}
                  />
                ) : (
                  <ContentChat
                    message={message.message}
                    css={"bg-slate-100 text-black mb-2 inline-block py-1 px-3"}
                    textLeftOrRight={"text-left"}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Content>
      <Footer>
        <InputChat handleSendMsg={handleSendMsg} />
      </Footer>
    </>
  );
}
