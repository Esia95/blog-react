import { List, Typography, Row, Col } from "antd";
import { Loading, ErrorResult } from "components";
import { CreatePostModel, PostPreview, EditPostModel } from "./components";
import postService from "services/post";
import { useQuery } from "react-query";

const { Title } = Typography;

const PostsList = () => {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery("posts", postService.fetchPosts);

  if (error) {
    return <ErrorResult errorMessage={error.message} />;
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Row gutter={[16, 16]} justify="end">
          <Col>
            <CreatePostModel />
            <EditPostModel />
          </Col>
          <Col>
            <List
              header={<Title style={{ paddingLeft: "24px" }}>Posts</Title>}
              itemLayout="vertical"
              size="large"
              style={{ backgroundColor: "white" }}
              dataSource={posts}
              renderItem={(post) => <PostPreview post={post} />}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default PostsList;
