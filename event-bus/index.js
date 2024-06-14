import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("Type: " + event.type)
  try {
    axios
      .post("http://comments-srv:4001/events", event)
      .then(async (res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
    axios
      .post("http://query-srv:4002/events", event)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err));
    axios
      .post("http://posts-srv:4000/events", event)
      .then(async (res) => {
        // console.log(await res.json());
      })
      .catch((err) => console.log(err));
    axios
      .post("http://moderation-srv:4003/events", event)
      .then(async (res) => {
        // console.log(await res.json());
      })
      .catch((err) => console.log(err));
    res.send("Event Finished");
  } catch (error) {
    res.send(error);
  }
});

app.listen(4005, () => {
  console.log("Posts service listening on " + 4005);
});
