import React from "react";
import img from "../../assets/img/loading/loading1.gif";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-300">
      <img src={img} alt="Loading..." className="object-cover w-200 h-200" />
    </div>
  );
}

