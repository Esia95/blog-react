import { useState, useEffect } from "react";
import { Spin, List } from "antd";

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
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={posts}
            renderItem={(post) => <PostPreview key={post.id} post={post} />}
          />
        </div>
      )}
    </div>
  );
};

export default PostsList;
