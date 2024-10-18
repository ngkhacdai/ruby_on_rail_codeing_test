import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, DatePicker, Form, Input, Modal, Table } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

function App() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [checkAction, setAction] = useState("");
  const [oepnUpdate, setOpenUpdate] = useState(false);
  const [handleValue, setHandleValue] = useState({});
  const [data, setData] = useState([
    {
      id: 1,
      title: "Title1",
      content: "Content 1",
      publisted_at: dayjs(Date.now()).format("DD/MM/YYYY, HH:mm"),
    },
    {
      id: 2,
      title: "Title 2",
      content: "Content 2",
      publisted_at: dayjs(Date.now()).format("DD/MM/YYYY, HH:mm"),
    },
    {
      id: 3,
      title: "Title 3",
      content: "Content 3",
      publisted_at: dayjs(Date.now()).format("DD/MM/YYYY, HH:mm"),
    },
    {
      id: 4,
      title: "Title 4",
      content: "Content 4",
      publisted_at: dayjs(Date.now()).format("DD/MM/YYYY, HH:mm"),
    },
  ]);
  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Content",
      key: "content",
      dataIndex: "content",
    },
    {
      title: "Publist_at",
      key: "publist_at",
      dataIndex: "publisted_at",
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <div className="flex gap-2  items-center">
            <Button
              onClick={() => {
                setOpenUpdate(true);

                setHandleValue(record);
              }}
            >
              Update
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setAction("Delete");
                setHandleValue(record);
              }}
              className="!bg-red-500"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const submitUpdata = (values) => {
    const updatedData = data.map((item) =>
      item.id === handleValue.id ? { ...item, ...values } : item
    );
    setData(updatedData);
    setOpenUpdate(false);
  };

  const handleOk = () => {
    if (checkAction == "Add") {
      form.submit();
    } else if (checkAction == "Delete") {
      setData(data.filter((item) => item.id != handleValue.id));
    }
  };
  const handleSubmit = (values) => {
    console.log(values);
    const form = {
      id: data.length + Math.random(),
      title: values.title,
      content: values.content,
      publisted_at: dayjs(values.publisted_at).format("DD/MM/YYYY, HH:mm"),
    };
    setData([...data, form]);
  };
  const handleUpdate = () => {
    formUpdate.submit();
  };
  return (
    <>
      <div>
        <Button
          onClick={() => {
            setOpen(true);
            setAction("Add");
          }}
          type="primary"
        >
          Add data
        </Button>
        <Table rowKey="id" columns={columns} dataSource={data} />
        <Modal
          title={checkAction}
          open={open}
          onOk={() => handleOk()}
          onCancel={() => {
            setOpen(false);
            setAction("");
          }}
        >
          {checkAction === "Add" ? (
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "You need to fill this feild",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  {
                    required: true,
                    message: "You need to fill this feild",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item name="publisted_at" label="Publisted_at">
                <DatePicker showTime />
              </Form.Item>
            </Form>
          ) : checkAction === "Delete" ? (
            <>
              <div>Do you want to delete this?</div>
            </>
          ) : (
            <></>
          )}
        </Modal>
        <Modal
          onCancel={() => setOpenUpdate(false)}
          onOk={handleUpdate}
          open={oepnUpdate}
        >
          <Form
            form={formUpdate}
            onFinish={submitUpdata}
            initialValues={{
              title: handleValue.title,
              content: handleValue.content,
            }}
            layout="vertical"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "You need to fill this feild",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="content"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "You need to fill this feild",
                },
              ]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item name="publisted_at" label="Publisted_at">
              <DatePicker showTime />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default App;
