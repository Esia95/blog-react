import React from "react";
import { IconText } from "components";
import { List, Typography, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

const PostPreview = ({ post }) => {
  const navigate = useNavigate();

  const handleNavigate = (postId) => navigate(`/posts/${postId}`);

  return (
    <List.Item
      key={post.id}
      actions={[
        <IconText
          icon={LikeOutlined}
          text={post.likesCount}
          key="list-vertical-like-o"
        />,
        <Button onClick={() => handleNavigate(post.id)}>Read more</Button>,
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
