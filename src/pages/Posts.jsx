import React, { useState } from "react";
import PostList from "../pages/PostList";

const PostForm = ({ addPost }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ author, content });
    setAuthor("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Your name" 
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea 
        placeholder="Write your festive post..." 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">🎄 Post</button>
    </form>
  );
};

export default PostForm;
