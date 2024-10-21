import { Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ModalAddAndUpdate from "./components/ModalAddAndUpdate";
import ModalDelete from "./components/ModalDelete";
import { NavLink, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      title: "Title 1",
      content: "Content 1",
      time: dayjs().format("YYYY-MM-DD HH:mm"),
    },
  ]);
  const colunms = [
    {
      key: "title",
      title: "Title",
      render: (record) => {
        return (
          <NavLink
            className="text-blue-500 hover:underline hover:text-blue-600"
            state={record}
            to={"/detail"}
          >
            {record.title}
          </NavLink>
        );
      },
    },
    {
      key: "content",
      title: "Content",
      dataIndex: "content",
    },
    {
      key: "time",
      title: "Progress_at",
      dataIndex: "time",
    },
    {
      key: "action",
      title: "Actions",
      render: (record) => {
        return (
          <div className="flex items-center gap-2">
            <ModalAddAndUpdate
              data={record}
              setData={(item) => {
                const findData = data.findIndex((item) => item.id == record.id);
                console.log(findData);
                if (findData !== -1) {
                  const copyData = [...data];
                  copyData[findData].title = item.title;
                  copyData[findData].content = item.content;
                  copyData[findData].time = item.time;
                  setData(copyData);
                }
              }}
            />
            <ModalDelete
              onDelete={() => {
                setData(
                  data.filter((item) => {
                    item.id != record.id;
                  })
                );
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ModalAddAndUpdate setData={(newData) => setData([...data, newData])} />
      <Table columns={colunms} rowKey={"id"} dataSource={data} />
    </div>
  );
};

export default App;
