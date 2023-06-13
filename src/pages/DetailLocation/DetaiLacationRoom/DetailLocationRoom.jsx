import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Hooks/HooksRedux";
import { getRoomListByLocation } from "../../../redux/Reducers/roomReducer";
import Title from "../Title/Title";
import ItemRoomLocation from "./ItemRoomLocation";

export default function DetailLocationRoom() {
  const { roomListLocation } = useAppSelector((state) => state.roomReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    const action = getRoomListByLocation(Number(id));
    dispatch(action);
  }, []);

  return (
    <div>
      <Title />
      <div className="mt-4 overflow-auto h-40rem px-4">
        {roomListLocation?.map((item, index) => {
          return <ItemRoomLocation location={item} key={index} />;
        })}
      </div>
    </div>
  );
}
