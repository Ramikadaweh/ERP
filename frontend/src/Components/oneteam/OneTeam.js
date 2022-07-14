import { useEffect, useState } from "react";
import React from "react";
import ProjectMember from "../ProjectMember/ProjectMember";
import deleteIcon from "../../images/deleteIcon.png";
import "./OneTeam.css";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import FetchUrl from "../../url";
import EmployeeCard from "../Cards/EmployeeCard";
import dele from "../settingPage/delete.svg";

let url = FetchUrl.fetchUrl;
let frontendUrl = FetchUrl.frontendLink;

const OneTeam = () => {
  const [Teams, getTeams] = useState("");
  const [Project, setProject] = useState("");
  const [Employee, setEmployee] = useState("");
  const [EmployeeId, setEmployeeId] = useState(null);
  const [ProjectId, setProjectId] = useState(null);
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    getOneTeam();

    axios.get(`${url}/api/project`, { crossdomain: true }).then((response) => {
      setProject(response.data.data);
    });
    axios.get(`${url}/api/employee`, { crossdomain: true }).then((response) => {
      setEmployee(response.data.data);
    });
  }, []);

  const getOneTeam = () => {
    axios
      .get(`${url}/api/team/${id}`)
      .then((response) => {
        const data = response.data.data;
        // console.log(data);
        getTeams(data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteTeam = () => {
    if (window.confirm(`Do you want to delete this team?`)) {
      axios.delete(`${url}/api/team/${id}`).then((response) => {
        if (response.data.status === 401) {
          console.log(response.data);
        } else if (response.data.status === 201) {
          alert(response.data.message);
          window.location.replace(`${frontendUrl}/teams`);
        }
        console.log(response.data.status);
      });
    }
  };

  const deleteEmployee = (e) => {
    let empol_id = e.target.getAttribute("data-id");
    axios
      .post(`${url}/api/employee/edit/${empol_id}`, { team_id: "0" })
      .then((response) => {
        console.log(response.data);
        getOneTeam();
      });
  };

  const deleteProject = (e) => {
    let pro_id = e.target.getAttribute("data-id");
    axios
      .post(`${url}/api/project/edit/${pro_id}`, { team_id: "0" })
      .then((response) => {
        console.log(response.data);
        getOneTeam();
      });
  };

  const handleChange = (e) => {
    setProjectId(e.target.value);
    setEmployeeId(e.target.value);
    console.log(ProjectId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/project/edit/${EmployeeId}`, { team_id: Teams.id })
      .then((Response) => {
        console.log(Response);
        getOneTeam();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addEmployee = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/api/employee/edit/${ProjectId}`, { team_id: Teams.id })
      .then((Response) => {
        console.log(Response);
        getOneTeam();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const id = useLocation().state.id;
  console.log(`${id}`);

  return (
    <div>
      {loader && <Loader />}
      {!loader && (
        <div className="oneteam">
          <div className="team_name">
            <h1>{Teams.team_name}</h1>
          </div>
          <div className="team_info">
            <p className="pp">team Member:</p>
            <form>
              <label for="project">Choose Employee:*</label>
              <select onChange={handleChange}>
                {" "}
                <option disabled>employee</option>
                {Employee &&
                  Employee.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.emp_first_name + " " + item.emp_last_name}
                      </option>
                    );
                  })}
              </select>

              <input onClick={addEmployee} type="submit" value="Add"></input>
            </form>
            <div className="team_component">
              <div className="empcard">
                {Teams.employee &&
                  Teams.employee.map((item, index) => {
                    return (
                      <div>
                        {/* <Link
                          to="../employees/employee"
                          state={{ id: item.id }}
                        > */}
                          <EmployeeCard
                            key={index}
                            name={
                              item.emp_first_name + " " + item.emp_last_name
                            }
                            email={item.email}
                            phone={item.phone}
                            source={`${url}/${item.picture}`}
                          />
                        {/* </Link> */}
                        <img
                          data-id={item.id}
                          src={dele}
                          alt={"delete employee"}
                          onClick={deleteEmployee}
                        ></img>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="prodel">
            <div className="pro_info">
              <p className="pp">Projects:</p>
              <form>
                <label for="project">Choose Project:*</label>
                <select onChange={handleChange}>
                  {" "}
                  <option disabled>project</option>
                  {Project &&
                    Project.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.project_name}
                        </option>
                      );
                    })}
                </select>

                <input onClick={handleSubmit} type="submit" value="Add"></input>
              </form>
              <div>
                {Teams.project &&
                  Teams.project.map((data, index) => {
                    return (
                      <div className="pro">
                        <Link to="../projects/project" state={{ id: data.id }}>
                          <ProjectMember key={index} name={data.project_name} />
                        </Link>
                        <img
                          data-id={data.id}
                          src={dele}
                          alt={"delete project"}
                          onClick={deleteProject}
                        ></img>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="delete_team" onClick={deleteTeam}>
              <p>Delete Team</p>
              <img src={deleteIcon} alt="delete team" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneTeam;
