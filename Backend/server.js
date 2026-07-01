const express = require("express"); //gets the express-libary, så we kan make a server

const app = express(); //make the backend app
app.use(express.json()) //backend is allowed to read json-data, from the request-bod

const allowedStatuses = ["Applied", "Interview", "Rejected", "Offer"];

// HELPER FUNCTIONs
//helper functon to validate application
function validateApplication(data) {
    const company = data.company;
    const position = data.position;

    if (typeof company !== "string" || company.trim() === "") {
    return "Company is required";
    }

    if (typeof position !== "string" || position.trim() === "") {
    return "Position is required";
    }

    if (
        data.status !== undefined &&
        !allowedStatuses.includes(data.status)
  ) {
        return "Status must be one of: Applied, Interview, Rejected, Offer";
  }

  return null;
}
//Parses the ID from the URL
function getIdFromRequest(req) {
  const id = parseInt(req.params.id);
  
    if (isNaN(id)) {
    return null;
  }

  return id;
}

//returns the appication with the Id you are looking for
function findApplicationById(id) {
  return applications.find((application) => application.id === id);
}

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

app.get("/applications", (req, res) => { //gets all the applicatio
  res.json(applications);
});

app.get("/applications/:id", (req, res) => { //gets one specific applications
    const applicationId = getIdFromRequest; // Access the ID from the URL parameter

    const application = findApplicationById(applicationId); //find the according id you are searching for

    if (!application) {
        return res.status(404).json({ message: "Application not found" }); //check if its an actual application
    }

    res.json(application);
});

app.post("/applications", (req, res) => { //post a new applications giving it new id, Applications are stored in an arrary
    const error = validateApplication(req.body)

    if (error) {
        return res.status(400).json({ message: error });
    }

    const {company, position, status} = req.body

    const newApplication = {    
        id: nextID++,
        company: company.trim(),
        position: position.trim(),
        status: status || "Applied"
    };

  applications.push(newApplication); //APPENDS THE APPLICAITON TO THE ARRAY

  res.status(201).json(newApplication);
});

app.delete("/applications/:id", (req, res) => {
    const applicationId = getIdFromRequest;

    const index = applications.findIndex(
        (application) => application.id === applicationId
    );

    if (index === -1) {
        return res.status(404).json({ message: "Application not found" });
    }

    applications.splice(index, 1);

    res.status(204).send();
});

app.put("/applications/:id", (req, res) => {
    const applicationId = getIdFromRequest;

    const application = findApplicationById(applicationId); //find the according id you are searching for

    if (!application) {
        return res.status(404).json({ message: "Application not found" }); //check if its an actual application
    }

        const error = validateApplication(req.body)

    if (error) {
        return res.status(400).json({ message: error });
    }

    const {company, position, status} = req.body

    application.company = company.trim();
    application.position = position.trim();
    application.status = status || application.status;

    res.json(application);
});


app.listen(3000, () => { //start the server on port 3000
  console.log("Server is running on http://localhost:3000");
});
