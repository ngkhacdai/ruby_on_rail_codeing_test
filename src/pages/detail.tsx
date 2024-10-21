import React from "react";
import { useLocation } from "react-router-dom";

const DetailPage: React.FunctionComponent = (params) => {
  const location = useLocation();
  const { title, content, time } = location.state;
  return (
    <div className="p-2 flex flex-col gap-2 mx-auto w-3/4">
      <p className="text-xl font-bold">{title}</p>
      <p className="text-right text-zinc-500">{time}</p>
      <p>{content}</p>
    </div>
  );
};

export default DetailPage;
