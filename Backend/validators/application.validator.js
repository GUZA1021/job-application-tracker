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

module.exports = {
  validateApplication
};
// exports validateApplication so routes can use it