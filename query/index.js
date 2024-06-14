import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

let posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  let type = req.body.type;
  let data = req.body.data;
  console.log(posts);
  console.log(data);
  if (type === "PostCreated") {
    posts[data.id] = { id: data.id, title: data.title, comments: [] };
  }
  if (type === "CommentCreated") {
    let { postId, id, content } = data;
    console.log(postId, id, content);
    let comments = posts[data.postId]?.comments || [];
    comments.push({ id: data.id, content: data.content });
    posts[data.postId].comments = comments;
  }

  if (type === "CommentModerated") {
    const { id, postId, content, status } = req.body.data;
    let comments = posts[postId].comments;
    comments = comments.map((comment) => {
      if (comment.id == id) {
        comment.status = status;
        return comment;
      }
      return comment;
    });
    console.log(comments);
    posts[postId].comments = comments;
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("Query service listening on " + 4002);
});
