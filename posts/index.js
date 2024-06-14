import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";
const app = express();
app.use(express.json());
app.use(cors());

let posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  console.log("Post Creations")
  let id = randomBytes(4).toString("hex");
  posts[id] = {
    id: id,
    title: req.body.title,
  };
  await axios.post("http://eventbus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title: req.body.title,
    },
  });
  res.send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Recieved " + req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Posts service listening on " + 4000);
});
