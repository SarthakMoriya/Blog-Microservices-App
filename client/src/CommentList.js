import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ comments: commts }) => {
  const [comments, setComments] = useState([...commts]);

  const fetchData = async () => {
    const res = await axios
      .get
      // `http://localhost:4001/posts/${postId}/comments`
      ();

    setComments(res.data);
  };

  useEffect(() => {
    // fetchData();
  }, []);

  const renderedComments = comments.map((comment) => {
    return comment.status === "approved" ? (
      <li key={comment.id}>{comment.content}</li>
    ) : comment.status === "rejected" ? (
      <li key={comment.id}>
        <i>This comment is rejected</i>
      </li>
    ) : (
      <li key={comment.id}><i>Awaiting Approval</i></li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
