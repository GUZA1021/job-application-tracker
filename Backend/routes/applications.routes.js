const express = require("express"); // gets the express-library

const router = express.Router(); 
// creates a mini-router for all application routes

const allowedStatuses = ["Applied", "Interview", "Rejected", "Offer"];
// only these statuses are allowed

function validateApplication(data) { // helper function to validate an application
  const company = data.company;
  const position = data.position;

  if (typeof company !== "string" || company.trim() === "") {
    return "Company is required"; // company must be a real string and not only whitespace
  }

  if (typeof position !== "string" || position.trim() === "") {
    return "Position is required"; // position must be a real string and not only whitespace
  }

  if (
    data.status !== undefined &&
    !allowedStatuses.includes(data.status)
  ) {
    return "Status must be one of: Applied, Interview, Rejected, Offer";
    // if status is sent, it must be one of the allowed statuses
  }

  return null; // no validation errors
}

function getIdFromRequest(req) { // helper function to get id from URL parameter
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return null; // invalid id, for example /applications/abc
  }

  return id;
}

function findApplicationById(id) { // helper function to find one application by id
  return applications.find((application) => application.id === id);
}

let applications = [
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
// temporary fake data stored in memory, later this will come from a database

let nextId = 3;
// keeps track of the next unique id for new applications for now, becuase again we have fake data'

router.get("/", (req, res) => { // gets all applications
  res.json(applications); // sends applications as JSON response
});

router.get("/:id", (req, res) => { // gets one specific application
  const applicationId = getIdFromRequest(req); // reads the id from the URL parameter

  if (applicationId === null) {
    return res.status(400).json({ message: "Invalid id" });
    // 400 means the client sent a bad request
  }

  const application = findApplicationById(applicationId);
  // finds the application with the matching id

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
    // 404 means the id is valid, but the application does not exist
  }

  res.json(application); // sends the found application as JSON
});

router.post("/", (req, res) => { // posts/creates a new application
  const error = validateApplication(req.body);
  // checks if the request body contains valid data

  if (error) {
    return res.status(400).json({ message: error });
    // stops the request if validation fails
  }

  const { company, position, status } = req.body;
  // gets company, position and status from the request body

  const newApplication = {
    id: nextId++, // gives the application a new unique id
    company: company.trim(), // removes whitespace before saving
    position: position.trim(), // removes whitespace before saving
    status: status || "Applied" // default status is Applied
  };

  applications.push(newApplication);
  // appends the new application to the array

  res.status(201).json(newApplication);
  // 201 means created, and sends the new application back as JSON
});

router.put("/:id", (req, res) => { // updates an existing application with id
  const applicationId = getIdFromRequest(req); // reads the id from the URL parameter

  if (applicationId === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const application = findApplicationById(applicationId);
  // finds the application we want to update

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  const error = validateApplication(req.body);
  // validates the new data before updating

  if (error) {
    return res.status(400).json({ message: error });
  }

  const { company, position, status } = req.body;

  application.company = company.trim();
  application.position = position.trim();
  application.status = status || application.status;
  // updates the existing application

  res.json(application);
  // sends the updated application back as JSON
});

router.delete("/:id", (req, res) => { // deletes application with id
  const applicationId = getIdFromRequest(req); // reads the id from the URL parameter

  if (applicationId === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const index = applications.findIndex(
    (application) => application.id === applicationId
  );
  // finds the index/position of the application in the array

  if (index === -1) {
    return res.status(404).json({ message: "Application not found" });
    // if index is -1, the application does not exist
  }

  applications.splice(index, 1);
  // removes 1 application at the found index

  res.status(204).send();
  // 204 means success, but no content is sent back
});

module.exports = router;
// exports the router so server.js can use it