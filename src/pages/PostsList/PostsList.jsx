import { useState, useEffect } from "react";
import { List } from "antd";
import { Loading } from "components";
import { PostPreview } from "./components";
import postService from "services/post";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    postService
      .fetchPosts()
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={posts}
          renderItem={(post) => <PostPreview post={post} />}
        />
      )}
    </>
  );
};

export default PostsList;
