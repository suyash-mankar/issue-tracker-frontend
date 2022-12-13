import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, CreateProject, ProjectDetails, CreateIssue } from "../pages";
import { NavbarComp } from "./";

function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/create" element={<CreateProject />} />
        <Route path="/project/details/:id" element={<ProjectDetails />} />
        <Route path="/issue/create/:id" element={<CreateIssue />} />
      </Routes>
    </Router>
  );
}

export default App;
