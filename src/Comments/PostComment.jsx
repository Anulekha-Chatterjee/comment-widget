import { useState } from "react";
import "../styles.css";

export default function PostComments({ handleAddComment }) {
  const [text, setText] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleAddComment(text);
    setText("");
  };
  return (
    <>
      <input
        type="text"
        className="comment-text-box"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="add-comment-btn" onClick={onSubmit}>
        ADD COMMENT
      </button>
    </>
  );
}
