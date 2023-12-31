import React from "react";

export default function DetailTotal({ price, totalDay }) {
  return (
    <div>
      <ul className="mt-4 border-b border-slate-400 pb-5 text-sm">
        <li className="flex items-center justify-between mb-2">
          <div className="underline">${price} x {totalDay} đêm </div>
          <div className="">${Number(price) * Number(totalDay)}</div>
        </li>
      </ul>
      <div className="mt-3 text-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold">Tổng trước thuế </div>
          <div className="">${Number(price) * Number(totalDay)}</div>
        </div>
      </div>
    </div>
  );
}
