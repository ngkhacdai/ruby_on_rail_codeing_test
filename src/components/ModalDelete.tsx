import { Button, Modal } from "antd";
import React, { FC, useState } from "react";

type ModalDeleteProps = {
  onDelete: () => void;
};

const ModalDelete: FC<ModalDeleteProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        className="bg-red-600  font-semibold hover:!bg-red-500"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Modal open={open} onOk={() => props.onDelete()} title="Delete">
        <p>Do you want to delete this?</p>
      </Modal>
    </div>
  );
};

export default ModalDelete;
