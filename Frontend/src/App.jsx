import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/applications";

function App() {
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const response = await fetch(API_URL);

      console.log("GET response:", response);

      if (!response.ok) {
        console.error("Failed to fetch applications");
        return;
      }

      const data = await response.json();

      console.log("Applications from backend:", data);

      setApplications(data);
    } catch (error) {
      console.error("Could not connect to backend:", error);
    }
  }

  async function handleAddApplication(e) {
    e.preventDefault();

    if (company.trim() === "" || position.trim() === "") {
      return;
    }

    const newApplication = {
      company,
      position,
      status
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newApplication)
    });

    if (!response.ok) {
      console.error("Failed to add application");
      return;
    }

    const createdApplication = await response.json();

    setApplications([...applications, createdApplication]);

    setCompany("");
    setPosition("");
    setStatus("Applied");
  }

  async function handleDeleteApplication(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      console.error("Failed to delete application");
      return;
    }

    setApplications(applications.filter((application) => application.id !== id));
  }

  async function handleStatusChange(id, newStatus) {
    const applicationToUpdate = applications.find(
      (application) => application.id === id
    );

    const updatedApplication = {
      ...applicationToUpdate,
      status: newStatus
    };

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedApplication)
    });

    if (!response.ok) {
      console.error("Failed to update application");
      return;
    }

    const savedApplication = await response.json();

    setApplications(
      applications.map((application) =>
        application.id === id ? savedApplication : application
      )
    );
  }

  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((application) => application.status === filter);

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <form onSubmit={handleAddApplication}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <button type="submit">Add application</button>
      </form>

      <div>
        <h2>Filter</h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <h2>Applications</h2>

      {filteredApplications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        filteredApplications.map((application) => (
          <div key={application.id}>
            <h3>{application.company}</h3>
            <p>{application.position}</p>
            <p>Status: {application.status}</p>

            <select
              value={application.status}
              onChange={(e) =>
                handleStatusChange(application.id, e.target.value)
              }
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>

            <button onClick={() => handleDeleteApplication(application.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;