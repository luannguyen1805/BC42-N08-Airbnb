import React from "react";
import { useAppSelector } from "../../../Hooks/HooksRedux";

import ItemImage from "./ItemImage";

export default function DetailImage() {
  const { roomArray } = useAppSelector((state) => state.roomReducer);
  return (
    <>
      <div className="mt-6">
        <div className="container">
          <div className=" w-full mt-4 overflow-hidden rounded-xl" style={{height: '440px'}}>
            <ItemImage arrImage={roomArray} index={1} />
          </div>
        </div>
      </div>
    </>
  );
}
