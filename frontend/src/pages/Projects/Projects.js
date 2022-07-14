import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ProjectCard from "../../Components/Cards/ProjectCard";
import "../../App.css";
import "./Projects.css";
import Search from "../../Components/Search/SearchProject";
import axios from "axios";
import fetchUrl from "../../url";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
function Employees() {
  const url = fetchUrl.fetchUrl;
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  let [loader, setLoader] = useState(true);
  const [data, setData] = useState({
    project_name: "",
    project_description: "",
    proj_start_date: "",
    proj_due_date: "",
    team_id: null,
  });

  const getAll = () => {
    axios
      .get(`${url}/api/project`)
      .then((response) => {
        setProjects((projects) => (projects = response.data.data));
        setLoader(false);
        // console.log(response.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${url}/api/team`)
      .then((response) => {
        setTeams((teams) => (teams = response.data.data));
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (data) => {
    setSearch(data.toLowerCase());
  };

  const filteredData = projects.filter((el) => {
    //if no input the return the original
    if (search === "") {
      return el;
    }
    //returns the item which contains the user input
    else {
      return el.project_name.toLowerCase().includes(search);
    }
  });

  const handledSort = (sortedData) => {
    setProjects([...sortedData]);
  };

  const addButton = () => {
    document
      .getElementsByClassName("add-project")[0]
      .classList.toggle("toggle-add-project");
    document
      .getElementsByClassName("addIcon")[0]
      .classList.toggle("button-rotate");
  };

  const handleChange = (e) => {
    setMessage("");
    let input = e.target.name;
    let value = e.target.value;
    if (input === "team_id") {
      value = e.target.options.selectedIndex;
      if (value === 0) value = null;
    }
    setData({ ...data, [input]: value });
    // console.log(data);
  };

  const submitProject = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/project`, data)
      .then((response) => {
        if (response.data.status === 201) {
          setMessage(response.data.message);
          document.getElementsByClassName("project_message")[0].style.color =
            "green";
          getAll();
          document.getElementById("add-project-form").reset();
        }
        if (response.data.status === 401) {
          setMessage("Please fill all the required fields");
          document.getElementsByClassName("project_message")[0].style.color =
            "red";
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(getAll, []);
  useEffect(() => {
    setTimeout(() => setMessage(""), 15000);
  }, [message]);

  return (
    <div>
      {/* <Navbar /> */}
      {loader && <Loader />}
      {!loader && (
        <div className="project-wrapper">
          <Search
            title="Projects"
            data={projects}
            handleSearch={handleSearch}
            handledSort={handledSort}
            addButton={addButton}
          />
          <div className="add-project toggle-add-project">
            <form id="add-project-form">
              <div className="add-project-child1">
                <div className="child1">
                  <label>Project Name: *</label>
                  <input
                    type="text"
                    name="project_name"
                    onChange={handleChange}
                  />
                  <label>Project Description: *</label>
                  <textarea
                    name="project_description"
                    id="project_description"
                    cols="20"
                    rows="5"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="child2">
                  <label>Set Start Date: *</label>
                  <input
                    type="date"
                    name="proj_start_date"
                    onChange={handleChange}
                  />
                  <label>Set Due Date: *</label>
                  <input
                    type="date"
                    name="proj_due_date"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-project-child3">
                <label>Assign to Team </label>
                <select name="team_id" id="team-select" onChange={handleChange}>
                  <option value="No team selected">
                    -- No team selected --{" "}
                  </option>
                  {teams &&
                    teams.map((team, index) => {
                      return (
                        <option key={index} value={team.team_id}>
                          {team.team_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </form>
            <div className="add_project_container">
              <button onClick={submitProject}>Add Project</button>
              {message && <div className="project_message">{message}</div>}
            </div>
            <hr />
          </div>
          <div className="projects_section">
            {projects &&
              filteredData.map((item, index) => (
                <Link to="project" state={{ id: item.id }}>
                  <ProjectCard
                    key={index}
                    name={item.project_name}
                    team={item.team_id}
                    startDate={item.proj_start_date}
                    dueDate={item.proj_due_date}
                  />
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Employees;
