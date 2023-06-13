import { Input } from "antd";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
const { Search } = Input;

const InputChat = ({ handleSendMsg }) => {
  const [mes, setMes] = useState();
  return (
    <>
      <Search
        allowClear
        enterButton={<IoMdSend />}
        size="large"
        onChange={(e) => {
          setMes(e.target.value);
        }}
        onSearch={(value) => {
          handleSendMsg(value);
          setMes(" ");
        }}
        value={mes}
        onPressEnter={(e) => {
          if (e.key === "Enter") {
            handleSendMsg(e.target.value);
            setMes(" ");
          }
        }}
      />
    </>
  );
};

export default InputChat;
