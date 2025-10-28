import React, { useEffect, useState } from "react";
import CommentSection from "../commentsection/CommentSection";
import "../postlist/PostList.css";

const PostList = ({ addPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts") // 
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const addComment = async (postId, author, text) => {
    await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, text }),
    });
    const updated = await fetch("http://localhost:3000/api/posts").then((res) =>
      res.json()
    );
    setPosts(updated);
  };

  return (
    <div className="post-list">
      <h2>🎅 Community Posts</h2>

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h3>🎁 {post.author}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
            <CommentSection
              comments={posts.comments}
              addComment={(author, text) => addComment(post._id, author, text)}
            />
        </div>
      ))}
    </div>
  );
};

export default PostList;
