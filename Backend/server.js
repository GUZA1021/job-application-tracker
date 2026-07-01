const express = require("express"); //gets the express-libary, så we kan make a server

const app = express(); //make the backend app
app.use(express.json()) //backend is allowed to read json-data, from the request-bod

let  applications = [
  {
    id: 1,
    company: "Hesehus",
    position: "Software Developer",
    status: "Applied"
  },
  {
    id: 2,
    company: "Netcompany",
    position: "Junior Developer",
    status: "Interview"
  }
];

app.get("/", (req, res) => { //reqeust and response
  res.send("Backend is running");
});

app.get("/applications", (req, res) => { //reqeust and response
  res.json(applications);
});

app.post("/applications", (req, res) => { //post a new applications giving it new id, Applications are stored in an arrary
  const newApplication = {
    id: applications.length + 1,
    company: req.body.company,
    position: req.body.position,
    status: req.body.status
  };

  applications.push(newApplication);

  res.status(201).json(newApplication);
})

app.delete('/applications/:id', (req, res) => { //delete application with ID
  const { id } = req.params; // Access the ID from the URL parameter
  applications = applications.filter(application => application.id !== parseInt(id)); // Remove the application
  res.status(204).send(`Application with ID ${id} has been deleted.`);
});

app.put("/applications/:id", (req, res) => {
    const { id } = req.params; // Access the ID from the URL parameter

    application = applications.find(application => application.id == parseInt(id));

    if (!application) {
        return res.status(404).json({ message: "Application not found" });
    }

    application.company = req.body.company;
    application.position = req.body.position;
    application.status = req.body.status;

    res.json(application);
});


app.listen(3000, () => { //start the server on port 3000
  console.log("Server is running on http://localhost:3000");
});
