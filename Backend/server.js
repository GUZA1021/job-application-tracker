const express = require("express");
const cors = require("cors");

const applicationsRouter = require("./routes/applications.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/applications", applicationsRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});