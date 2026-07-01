const express = require("express"); // gets the express-library, so we can make a server

const applicationsRouter = require("./routes/applications.routes"); // imports the application routes

const app = express(); // makes the backend app

app.use(express.json()); // backend is allowed to read JSON-data from the request body

app.get("/", (req, res) => { // request and response
  res.send("Backend is running");
});

app.use("/applications", applicationsRouter); 
// all routes inside applications.routes.js now start with /applications

app.listen(3000, () => { // starts the server on port 3000
  console.log("Server is running on http://localhost:3000");
});