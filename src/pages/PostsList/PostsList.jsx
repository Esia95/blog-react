import { List, Typography } from "antd";
import { Loading } from "components";
import { PostPreview } from "./components";
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
        <List
          header={<Title style={{ paddingLeft: "24px" }}>Posts</Title>}
          itemLayout="vertical"
          size="large"
          style={{ backgroundColor: "white" }}
          dataSource={posts}
          renderItem={(post) => <PostPreview post={post} />}
        />
      )}
    </>
  );
};

export default PostsList;
