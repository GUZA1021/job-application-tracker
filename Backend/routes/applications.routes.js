const express = require("express"); // gets the express-library

const applicationService = require("../services/applications.service");
// imports the application service, which handles application data logic

const { validateApplication } = require("../validators/application.validator");
// imports the validation function for applications

const router = express.Router();
// creates a mini-router for all application routes

function getIdFromRequest(req) { // helper function to get id from URL parameter
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return null;
  }

  return id;
}

router.get("/", (req, res) => { // gets all applications
  const applications = applicationService.getAllApplications();
  // asks the service for all applications

  res.json(applications);
  // sends applications as JSON response
});

router.get("/:id", (req, res) => { // gets one specific application
  const applicationId = getIdFromRequest(req);
  // reads the id from the URL parameter

  if (applicationId === null) {
    return res.status(400).json({ message: "Invalid id" });
    // 400 means the client sent a bad request
  }

  const application = applicationService.getApplicationById(applicationId);
  // asks the service to find the application

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
    // 404 means the id is valid, but the application does not exist
  }

  res.json(application);
  // sends the found application as JSON
});

router.post("/", (req, res) => { // creates a new application
  const error = validateApplication(req.body);
  // validates the request body before creating

  if (error) {
    return res.status(400).json({ message: error });
    // stops the request if validation fails
  }

  const newApplication = applicationService.createApplication(req.body);
  // asks the service to create the application

  res.status(201).json(newApplication);
  // 201 means created
});

router.put("/:id", (req, res) => { // updates an existing application
  const applicationId = getIdFromRequest(req);

  if (applicationId === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const error = validateApplication(req.body);
  // validates the new data before updating

  if (error) {
    return res.status(400).json({ message: error });
  }

  const updatedApplication = applicationService.updateApplication(
    applicationId,
    req.body
  );
  // asks the service to update the application

  if (!updatedApplication) {
    return res.status(404).json({ message: "Application not found" });
  }

  res.json(updatedApplication);
  // sends the updated application back as JSON
});

router.delete("/:id", (req, res) => { // deletes application with id
  const applicationId = getIdFromRequest(req);

  if (applicationId === null) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const deleted = applicationService.deleteApplication(applicationId);
  // asks the service to delete the application

  if (!deleted) {
    return res.status(404).json({ message: "Application not found" });
  }

  res.status(204).send();
  // 204 means success, but no content is sent back
});

module.exports = router;
// exports the router so server.js can use it