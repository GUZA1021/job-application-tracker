import { useState } from "react";

function App() {
  const [applications, setApplications] = useState([
    createApplication(1, "Hesehus", "Software Developer", "Applied", "2026-07-01"),
    createApplication(2, "Netcompany", "Junior Developer", "Interview", "2026-07-02"),
    createApplication(3, "Lunar", "Junior Backend Developer", "Rejected", "2026-07-03")
  ]);

  function handleAddApplication() {
    const newId = applications.length + 1
    const newApplication = createApplication(
      newId,
      "Novo Nordisk",
      "Frontend Developer",
      "Applied",
      "2026-07-04"
    );

    setApplications([...applications, newApplication]);
  }

  function handleDeleteApplication(id) {
    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );
    setApplications(updatedApplications);
  }

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <button onClick={handleAddApplication}>
        Add test application
      </button>

      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} onDelete={handleDeleteApplication} />
      ))}

      <p>Frontend is running</p>
    </div>
  );
}

function createApplication(id, company, position, status, appliedDate) {
  return { id, company, position, status, appliedDate };
}

function ApplicationCard({ application, onDelete }) {
  return (
    <div>
      <h2>{application.company}</h2>
      <p>{application.position}</p>
      <p>Status: {application.status}</p>
      <p>Applied date: {application.appliedDate}</p>¨
      <button onClick={() => onDelete(application.id)}>
        Delete
      </button>
    </div>
  );
}

export default App;