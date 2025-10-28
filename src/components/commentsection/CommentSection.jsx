import React, { useState } from "react";
import "../commentsection/CommentSection.css";

const CommentSection = ({ comments, addComment }) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(author, text);
    setAuthor("");
    setText("");
  };

  if (!addComment) {
    return null;
  }

   return (
    <div className="comment-section">
      <h4>💬 Comments</h4>
      {comments?.length > 0 ? (
        comments.map((c, i) => (
          <div key={i} className="comment">
            <strong>{c.author}</strong>: {c.text}
          </div>
        ))
      ) : (
        <p>No comments yet 🎁</p>
      )}

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">✨ Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
