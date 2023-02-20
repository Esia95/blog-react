import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading, IconText } from "components";
import { Card } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import postService from "services/post";

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .fetchPost(postId)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Not found") {
          navigate("/not-found");
        }
      });
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
