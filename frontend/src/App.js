import "./App.css";
import Kpi from "./pages/Kpi/Kpi";
import Report from "./pages/Reports/Report";
import Report1 from "./pages/Reports/Report1";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Projects/Project";
import { reports_links } from "./pages/Reports/reports-links";
import HomePage from "./pages/Home_Page/HomePage";
import Employee from "./pages/employee/employee";
import Employees from "./pages/employee/employees";
import Teams from "./Components/AllTeam/teamss";
import OneTeam from "./Components/oneteam/OneTeam";
import Home from "./Components/HomePage/home";
import Setting from "./Components/settingPage/setting";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Navbar/Layout";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import NotFound from "./pages/notFound/notFound";
import axios from "axios";

function App() {
  // set common header token
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  // axios.interceptors.request.use((request) => {
  //   console.log("Starting Request", JSON.stringify(request, null, 2));
  //   return request;
  // });
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" exact element={<HomePage />} />
          <Route path="/*" exact element={<NotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home-page" exact element={<Home />} />
            <Route path="employees/employee" element={<Employee />} />
            <Route path="teams/oneteam" element={<OneTeam />} />
            <Route path="projects/project" element={<Project />} />
            <Route path="setting" element={<Setting />} />
            {reports_links.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.link}
                  element={
                    <Report1
                      title={item.title}
                      description={item.description}
                      type={item.type}
                    />
                  }
                />
              );
            })}
            <Route path="/" element={<Layout />}>
              <Route path="kpis" element={<Kpi />} />
              <Route path="projects" element={<Projects />} />
              <Route path="teams" element={<Teams />} />
              <Route path="employees" element={<Employees />} />
              <Route path="reports" element={<Report />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
