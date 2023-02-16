import { useState, useEffect } from "react";
import { List } from "antd";
import { Loading } from "../../components";
import { PostPreview } from "./components";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
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
