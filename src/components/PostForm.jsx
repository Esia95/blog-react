import { Form, Input } from "antd";

const { TextArea } = Input;

const PostForm = ({ form }) => {
  const handleFormSubmit = (values) => console.log("Finish", { values });

  return (
    <Form
      name="createPost"
      onFinish={handleFormSubmit}
      layout="vertical"
      form={form}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Post content">
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>
    </Form>
  );
};

export default PostForm;
