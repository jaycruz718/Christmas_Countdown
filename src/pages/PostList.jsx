import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const addComment = async (postId, author, text) => {
    await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, text })
    });
    const updated = await fetch("http://localhost:3000/api/posts").then(res => res.json());
    setPosts(updated);
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{post.author}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
          <CommentSection comments={post.comments} addComment={(author, text) => addComment(post._id, author, text)} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
