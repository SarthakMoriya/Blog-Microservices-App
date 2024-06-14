import cors from "cors";
import axios from "axios";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log(type, data);
  if (type === "CommentCreated") {
    let { id, content, postId } = data;
    if (content.includes("orange")) {
      await axios.post("http://eventbus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id,
          content,
          postId,
          status: "rejected",
        },
      });
    } else {
      await axios.post("http://eventbus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id,
          content,
          postId,
          status: "approved",
        },
      });
    }
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation Service listening on " + 4003);
});
