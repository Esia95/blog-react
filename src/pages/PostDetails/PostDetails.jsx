import { useParams, useNavigate } from "react-router-dom";
import { Loading, IconText, ErrorResult } from "components";
import { Card } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import postService from "services/post";
import { useQuery } from "react-query";

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const {
    isLoading,
    data: post,
    error,
  } = useQuery(["post", postId], () => postService.fetchPost(postId));

  if (error) {
    if (error.message === "Not found") {
      navigate("/not-found");
    } else {
      return <ErrorResult errorMessage={error.message} />;
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
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
