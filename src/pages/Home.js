import styles from "../styles/home.module.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  // To navigate/redirect
  const navigate = useNavigate();
  // Define projects state
  const [projects, setProjects] = useState();

  useEffect(() => {
    // Fetch the projects data from database
    const getProjects = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/home`);
      if (response.status === 200) {
        const data = await response.json();
        // Set projects state
        setProjects(data);
      }
    };
    getProjects();
  }, []);

  // On clicking open project button navigate to project details page
  const handleOpenProject = (e) => {
    return navigate(`/project/details/${e.target.value}`);
  };

  return (
    <div>
      <div className={styles.outerContainer}>
        {/* If the projects are not yet fetched, show loading*/}
        {typeof projects === "undefined" ? (
          <h1 style={{ margin: "50px 17px" }}>Loading...</h1>
        ) : (
          <>
            <div className={styles.heading}>
              {/* Heading along with total number of projects */}
              <h2>ALL PROJECTS ({projects.data.length}) </h2>
              {/* To create new Project */}
              <Link to="/project/create">
                <Button className={styles.btn} variant="success">
                  Create New Project
                </Button>
              </Link>
            </div>
            <div className={styles.projectsContainer}>
              {/* Iterate over each project and render it  */}
              {projects.data.map((project) => {
                return (
                  <div className={styles.card} key={project._id}>
                    <h2>{project.name}</h2>
                    <p style={{ color: "#2CBF2E", fontSize: "1.2rem" }}>
                      {project.description}
                    </p>
                    <p className={styles.author}>Author : {project.author}</p>
                    {/* Button to open project */}
                    <Button
                      variant="outline-light"
                      onClick={(e) => handleOpenProject(e)}
                      value={project._id}
                      className={styles.openProjectBtn}
                    >
                      Open Project
                    </Button>
                    {/* Display the number of issues in the project */}
                    <p className={styles.issues}>
                      Issues: {project.issues.length}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
