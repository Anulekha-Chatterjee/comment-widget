import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "../styles.css";

export default function DisplayComment({
  eachComment,
  handleDeleteComment,
  handleAddComment,
  replies,
  getReplies,
  parentId = null
}) {
  const replyId = parentId ? parentId : eachComment.id;
  const [isReplyBox, setReplyBox] = useState(false);
  const [text, setText] = useState("");

  const onDeleteClick = (event, id) => {
    event.stopPropagation();
    handleDeleteComment(id);
    setText("");
  };

  const onReplyClick = (text, replyId) => {
    setReplyBox(false);
    handleAddComment(text, replyId);
    setText("");
  };

  return (
    <div
      className={
        eachComment.parentId === null
          ? "each-parent-comment"
          : "each-child-comment"
      }
    >
      <AccountCircleIcon className="account-icon" />
      <div className="each-comment-container">
        <div className="each-comment-user">
          <span className="user-name">{eachComment.user}</span>
          <span style={{ marginLeft: "5px" }}>{eachComment.createdAt}</span>
        </div>
        <div>
          <span> {eachComment.text} </span>
          <button
            className="delete-btn"
            onClick={(event) => onDeleteClick(event, eachComment.id)}
          >
            DELETE
          </button>
          <button className="reply-btn" onClick={() => setReplyBox(true)}>
            REPLY
          </button>
        </div>
        {isReplyBox && (
          <div className="reply-container">
            <input
              type="text"
              placeholder="enter your reply"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="nested-reply-btn"
              onClick={() => onReplyClick(text, replyId)}
            >
              REPLY
            </button>
          </div>
        )}
        {replies?.map((reply) => (
          <DisplayComment
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
            eachComment={reply}
            getReplies={getReplies}
            replies={getReplies(reply.id)}
            parentId={reply.id}
          />
        ))}
      </div>
    </div>
  );
}
