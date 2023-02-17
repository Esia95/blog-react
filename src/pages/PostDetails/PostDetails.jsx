import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "components";
import { Card } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import IconText from "../PostsList/components/IconText";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card title={post?.title}>
          {post?.body}
          <div>
            <IconText
              icon={LikeOutlined}
              text={post?.likesCount}
              key="list-vertical-like-o"
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default PostDetails;
