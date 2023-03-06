import { IconText } from "components";
import { List, Typography, Button, Space, Modal } from "antd";
import {
  LikeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { LikeOutlined } from "@ant-design/icons";
import { Button, List, Typography } from "antd";
import { IconText } from "components";
import { useNavigate } from "react-router-dom";
import postService from "services/post";
import { useMutation, useQueryClient } from "react-query";
import { showSuccessNotification } from "helpers";
import { showErrorNotifiation } from "helpers/showErrorNotification";
import styled from "styled-components";

const { Paragraph } = Typography;

const ExtraContentWrapper = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
`;

const PostPreview = ({ post }) => {
  const navigate = useNavigate();
  const handleNavigate = (postId) => navigate(`/posts/${postId}`);
  const queryClinet = useQueryClient();

  const { isLoading, data, isError, mutate } = useMutation(
    () => postService.deletePost(post.id),
    {
      onSuccess: () => {
        showSuccessNotification();

        queryClinet.invalidateQueries("posts");
      },
      onError: (error) => {
        showErrorNotifiation(error.message);
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
      key={post.title}
      actions={[
        <IconText
          icon={LikeOutlined}
          text={post.likesCount}
          key="list-vertical-like-o"
        />,
      ]}
      extra={
        <ExtraContentWrapper>
          <Button type="primary" onClick={() => handleNavigate(post.id)}>
            Read more
          </Button>
        </ExtraContentWrapper>
      }
    >
      <List.Item.Meta title={post.title} />
      <Paragraph ellipsis={{ rows: 2, expandable: false }}>
        {post.body}
      </Paragraph>
    </List.Item>
  );
};

export default PostPreview;
