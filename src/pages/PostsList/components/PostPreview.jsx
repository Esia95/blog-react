import React from "react";
import { useState } from "react";
import { List, Space, Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { LikeOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const PostPreview = ({ posts }) => {
  const [ellipsis] = useState(true);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: () => {},
        pageSize: 5,
      }}
      dataSource={posts}
      renderItem={(post) => (
        <List.Item
          key={post.id}
          actions={[
            <IconText
              icon={LikeOutlined}
              text="232"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={CommentOutlined}
              text="2"
              key="list-vertical-comment"
            />,
          ]}
        >
          <List.Item.Meta title={post.title} />

          <Paragraph ellipsis={ellipsis}>
            {post.body.split(".").slice(0, 2).join(". ") + "."}
          </Paragraph>

          <Paragraph
            ellipsis={
              ellipsis
                ? {
                    rows: 2,
                    expandable: true,
                    symbol: "more",
                  }
                : false
            }
          >
            {post.body.split(".").slice(3).join(". ") + "."}
          </Paragraph>
        </List.Item>
      )}
    />
  );
};
export default PostPreview;
