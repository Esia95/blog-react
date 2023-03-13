import { IconText } from "components";
import { List, Typography, Button, Space, Modal } from "antd";
import {
  LikeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import postService from "services/post";
import { useMutation, useQueryClient } from "react-query";
import { showSuccessNotification, showErrorNotification } from "helpers";

const { Paragraph } = Typography;

const PostPreview = ({ post }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNavigate = (postId) => navigate(`/posts/${postId}`);

  const { isLoading, mutate } = useMutation(
    () => postService.deletePost(post.id),
    {
      onSuccess: () => {
        showSuccessNotification();
        queryClient.invalidateQueries("posts");
      },
      onError: (error) => {
        showErrorNotification(error.message);
      },
    }
  );

  const handleOk = () => {
    mutate();
  };

  const confirm = () => {
    Modal.confirm({
      title: "Delete post",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this post?",
      onOk: handleOk,
    });
  };

  return (
    <List.Item
      key={post.id}
      actions={[
        <IconText
          icon={LikeOutlined}
          text={post.likesCount}
          key="list-vertical-like-o"
        />,
        <Space>
          <Button onClick={() => handleNavigate(post.id)}>Read more</Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={confirm}
            loading={isLoading}
          >
            Delete
          </Button>
        </Space>,
      ]}
    >
      <List.Item.Meta
        title={post.title}
        description={
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: false,
            }}
          >
            {post.body}
          </Paragraph>
        }
      />
    </List.Item>
  );
};

export default PostPreview;
