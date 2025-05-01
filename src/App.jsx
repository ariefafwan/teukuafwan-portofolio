import "./App.css";
import { CardSkills } from "./components/CardSkills";
import { CardExperience } from "./components/CardExperience";
import { CardProjects } from "./components/CardProjects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/index";
import { ProjectPage } from "./pages/Project";
import { ProjectDetail } from "./pages/ProjectDetail";

function App() {
  const ErrorPage = () => {
    return (
      <>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage></IndexPage>}></Route>
          <Route path="/projects" element={<ProjectPage></ProjectPage>}></Route>
          <Route path="/projects/detail/:id" element={<ProjectDetail></ProjectDetail>}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
