import React, { useState } from "react";

const CommentSection = ({ comments, addComment }) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(author, text);
    setAuthor("");
    setText("");
  };

  return (
    <div>
      <h4>Comments:</h4>
      {comments.map(c => (
        <p key={c._id}><strong>{c.author}</strong>: {c.text}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input 
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default CommentSection;
