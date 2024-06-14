import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

let commentsArr = [];

app.get("/posts/:id/comments", (req, res) => {
  let id = req.params.id;
  const comments = commentsArr[id] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  let id = randomBytes(4).toString("hex");
  let comments = commentsArr[req.params.id] || [];

  comments.push({ id, content: req.body.content });
  commentsArr[req.params.id] = comments;

  await axios.post("http://eventbus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content: req.body.content,
      postId: req.params.id,
      status:"pending"
    },
  });
  res.send(comments);
});

app.post('/events',(req,res)=>{
  console.log("Event Recieved "+req.body.type)
  res.send({})
})

app.listen(4001, () => {
  console.log("Comments service listening on " + 4001);
});
