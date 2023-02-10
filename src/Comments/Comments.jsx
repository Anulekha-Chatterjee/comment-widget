import "../styles.css";
import { useState, useEffect } from "react";
import PostComments from "./PostComment";
import DisplayComment from "./DisplayComment";

import { getComments, createComment, deleteComment } from "../api";

export default function Comments() {
  const [commentsData, setCommentsData] = useState([]);
  const parentComment = commentsData.filter((obj) => obj.parentId === null);

  console.log(commentsData);

  useEffect(() => {
    getComments().then((data) => {
      setCommentsData(data);
    });
  }, []);

  const handleAddComment = (text, parentId) => {
    createComment(text, parentId).then((comment) => {
      setCommentsData([comment, ...commentsData]);
    });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment().then(() => {
      const updatedComments = commentsData.filter(
        (comment) => comment.id !== commentId
      );
      setCommentsData(updatedComments);
    });
  };

  const getReplies = (commentId) => {
    const replies = commentsData.filter(
      (commentData) => commentData.parentId === commentId
    );
    return replies;
  };

  return (
    <>
      {" "}
      <div className="comments-header">Comment widget</div>
      <PostComments handleAddComment={handleAddComment} />
      <div className="comments-container">
        {parentComment.map((comment) => (
          <DisplayComment
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
            eachComment={comment}
            getReplies={getReplies}
            replies={getReplies(comment.id)}
            parentId={comment.id}
          />
        ))}
      </div>
    </>
  );
}
