import React, { FC, useState } from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

type ModalAddAndUpdateProps = {
  data?: any;
  setData: (data: any) => void;
};

const ModalAddAndUpdate: FC<ModalAddAndUpdateProps> = (props) => {
  const { data, setData } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    setData({
      id: data?.id || Math.random(),
      title: values.title,
      content: values.content,
      time: values.time ? values.time.format("YYYY-MM-DD HH:mm") : null,
    });
    form.resetFields();
    setOpen(false);
  };

  const initialValues = {
    title: data?.title || "",
    content: data?.content || "",
    time: data?.time ? dayjs(data.time, "YYYY-MM-DD HH:mm") : null,
  };

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        {data ? "Update" : "Add"}
      </Button>
      <Modal open={open} onOk={onOk} onCancel={() => setOpen(false)}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input the content!" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item name="time" label="Progress_at">
            <DatePicker showTime className="!w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalAddAndUpdate;
