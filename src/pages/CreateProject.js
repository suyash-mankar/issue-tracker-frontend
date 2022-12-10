import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/createProject.module.css";
import { useFormInput } from "../hooks";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  // To navigate/redirect
  const navigate = useNavigate();

  // Define states using custom hook - useFormInput
  const name = useFormInput("");
  const description = useFormInput("");
  const author = useFormInput("");

  // On form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make an API call to create project in database
    const res = await fetch("/project/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        description: description.value,
        author: author.value,
      }),
    });

    if (res.status === 200) {
      console.log("form data successfully send from frontend");
      return navigate("/");
    }
  };

  return (
    <div className={styles.outerContainer}>
      <h1 style={{ color: "#2CBF2E", marginBottom: "30px" }}>
        Enter Project Details
      </h1>
      {/* Form to create new project */}
      <Form className={styles.form} onSubmit={handleSubmit}>
        {/* Project name */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            name="name"
            {...name}
            type="text"
            placeholder="Enter Project Name"
            required
          />
        </Form.Group>
        {/* Project description */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            {...description}
            as="textarea"
            rows={3}
            placeholder="Enter Project Description"
            required
          />
        </Form.Group>
        {/* Project author */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            {...author}
            type="text"
            placeholder="Enter Author's Name"
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
        <Button
          variant="danger"
          className={styles.backBtn}
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </Form>
    </div>
  );
}

export default CreateProject;
