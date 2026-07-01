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
// temporary fake data stored in memory
// later this will be replaced with a real database

let nextId = 3;
// keeps track of the next unique id for new applications

function getAllApplications() {
  return applications;
  // returns all applications
}

function getApplicationById(id) {
  return applications.find((application) => application.id === id);
  // finds and returns one application with the matching id
  // if no application is found, it returns undefined
}

function createApplication(data) {
  const newApplication = {
    id: nextId++, // gives the new application a unique id
    company: data.company.trim(), // removes whitespace before saving
    position: data.position.trim(), // removes whitespace before saving
    status: data.status || "Applied" // uses Applied as default status
  };

  applications.push(newApplication);
  // adds the new application to the array

  return newApplication;
  // returns the newly created application
}

function updateApplication(id, data) {
  const application = getApplicationById(id);
  // tries to find the application we want to update

  if (!application) {
    return null;
    // returns null if the application does not exist
  }

  application.company = data.company.trim();
  application.position = data.position.trim();
  application.status = data.status || application.status;
  // updates the existing application with the new values

  return application;
  // returns the updated application
}

function deleteApplication(id) {
  const index = applications.findIndex(
    (application) => application.id === id
  );
  // finds the index/position of the application in the array

  if (index === -1) {
    return false;
    // returns false if the application does not exist
  }

  applications.splice(index, 1);
  // removes 1 application at the found index

  return true;
  // returns true when the application was deleted
}

module.exports = {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication
};
// exports the service functions so routes can use them