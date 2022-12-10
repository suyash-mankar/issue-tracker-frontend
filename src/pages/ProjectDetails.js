import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/projectDetails.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IssueCard, Filter } from "../components";

function ProjectDetails() {
  // Get the project id from the url
  let { id } = useParams();
  // To navigate/redirect
  const navigate = useNavigate();
  // Define project state and filtered issues state
  const [project, setProject] = useState();
  const [filteredIssues, setFilteredIssues] = useState([]);

  useEffect(() => {
    // Make an API call to get the project details from  database
    const getProject = async () => {
      const response = await fetch(`/project/details/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        // set the project data in project state
        setProject(data);
        // set the issues data in filteredIssues state
        setFilteredIssues(data.data.issues);
      }
    };
    getProject();
  }, [id]);

  // On clicking create issue button
  const handleCreateIssueBtn = (e) => {
    return navigate(`/issue/create/${id}`);
  };

  // Define an issues array
  let issues = [];
  // After fetching the project data from API, set issues in issues array
  if (typeof project !== "undefined") {
    issues = project.data.issues;
  }

  return (
    <div className={styles.outerContainer}>
      {/* If the projects are not yet fetched, show loading*/}
      {typeof project === "undefined" ? (
        <h1 style={{ margin: "50px 17px" }}>Loading...</h1>
      ) : (
        <>
          <div className={styles.projectDetailsContainer} key={project._id}>
            {/* Show project details */}
            <div className="projectDetails">
              <h3>{project.data.name}</h3>
              <p style={{ color: "#2CBF2E", fontSize: "1.2rem" }}>
                {project.data.description}
              </p>
              <hr style={{ color: "white" }} />
            </div>

            <div className={styles.buttonContainer}>
              {/* Button to create new issue */}
              <Button
                variant="success"
                className={styles.issueBtn}
                value={project._id}
                onClick={(e) => {
                  handleCreateIssueBtn(e);
                }}
              >
                Create New Issue
              </Button>
              {/* Button to go back */}
              <Button
                variant="danger"
                className={styles.issueBtn}
                onClick={(e) => {
                  navigate("/");
                }}
              >
                Go Back
              </Button>
            </div>
          </div>

          <div className={styles.filtersIssuesContainer}>
            <div className={styles.filtersHeadingContainer}>
              <h2 style={{ marginBottom: 25 }}>Filters</h2>
              {/* Render the filter component */}
              <Filter
                issues={issues}
                filteredIssues={filteredIssues}
                setFilteredIssues={setFilteredIssues}
              />
            </div>

            {/* If no issues present or found */}
            {filteredIssues.length === 0 ? (
              <h1 style={{ margin: "50px 100px" }}> No Issues Found </h1>
            ) : (
              <div className={styles.issueContainer}>
                <h3 style={{ marginBottom: 30 }}>
                  ALL ISSUES ({filteredIssues.length})
                </h3>
                {/* Render the filtered issues */}
                {filteredIssues.map((issue) => {
                  return <IssueCard issue={issue} key={issue._id} />;
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectDetails;
