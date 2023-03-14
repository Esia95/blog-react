import { List, Typography, Row, Col } from "antd";
import { Loading, ErrorResult } from "components";
import { CreatePostModel, PostPreview } from "./components";
import postService from "services/post";
import { useQuery } from "react-query";
import { useState } from "react";

const { Title } = Typography;

const LIMIT = 10;

const PostsList = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery(["posts", page], async () => {
    const { response, totalCount } = await postService.fetchPaginationPosts(
      page,
      LIMIT
    );
    setTotalCount(totalCount);
    return response;
  });

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
          </Col>
          <Col>
            <List
              header={<Title style={{ paddingLeft: "24px" }}>Posts</Title>}
              itemLayout="vertical"
              size="large"
              style={{ backgroundColor: "white" }}
              dataSource={posts}
              renderItem={(post) => <PostPreview post={post} />}
              pagination={{
                onChange: (page) => {
                  setPage(page);
                },
                current: page,
                pageSize: LIMIT,
                total: +totalCount,
              }}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default PostsList;
