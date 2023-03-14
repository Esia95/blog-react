import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Skeleton, Space } from "antd";
import { ErrorResult } from "components";
import { showErrorNotification, showSuccessNotification } from "helpers";
import { EditPostModel } from "pages/PostsList/components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import postService from "services/post";

const { Meta } = Card;

const PostDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { postId } = useParams();

  const {
    isLoading,
    data: post,
    error,
  } = useQuery(["post", postId], () => postService.fetchPost(postId));

  const { isLoading: isLoadingAfterUpdate, mutate } = useMutation(
    (data) => postService.updatePost(postId, data),

    {
      onSuccess: () => {
        showSuccessNotification("Likes updated");
        queryClient.invalidateQueries(["post", postId]);
      },
      onError: () => {
        showErrorNotification("Problem with likes updated");
      },
    }
  );

  const handleLike = () => mutate({ ...post, likesCount: post.likesCount + 5 });
  const handleDislike = () =>
    mutate({ ...post, likesCount: post.likesCount - 10 });

  if (error) {
    if (error.message === "Not found") navigate("/not-found");
    else return <ErrorResult errorMessage={error.message} />;
  }

  return (
    <Row justify="center">
      <Col md={20}>
        <Card
          actions={[
            <Space key="LikeButton">
              {post?.likesCount}
              <Button
                type="link"
                key="likesCount"
                icon={<LikeOutlined />}
                disabled={isLoading || isLoadingAfterUpdate}
                onClick={() => handleLike(post)}
              />
              <Button
                type="link"
                key="dislikesCount"
                icon={<DislikeOutlined />}
                disabled={isLoading || isLoadingAfterUpdate}
                onClick={() => handleDislike(post)}
              />
            </Space>,
            <EditPostModel />,
          ]}
        >
          <Skeleton loading={isLoading} active title paragraph={{ rows: 10 }}>
            <Meta title={post?.title} description={post?.body} />
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
};

export default PostDetails;
