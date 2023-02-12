import React from "react";
import IconText from "./IconText";
import { List, Typography, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const PostPreview = ({ post }) => {
  return (
    <List.Item
      key={post.id}
      actions={[
        <IconText
          icon={LikeOutlined}
          text={post.likesCount}
          key="list-vertical-like-o"
        />,
        <Button>Read more</Button>,
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
