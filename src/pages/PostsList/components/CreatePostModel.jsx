import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { PostForm } from "components";
import { useState } from "react";

const CreatePostModal = () => {
  const [open, setOpen] = useState(false);

  const toggleModalVisibility = () => setOpen((prev) => !prev);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={toggleModalVisibility}
      >
        Add Post
      </Button>
      <Modal open={open} onCancel={toggleModalVisibility} title="Create post">
        <PostForm />
      </Modal>
    </>
  );
};

export default CreatePostModal;
