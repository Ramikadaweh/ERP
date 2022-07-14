import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FetchUrl from "../../url";
import back from "../../images/undo.jpg";
import TeamCard from "../../Components/Cards/TeamCard";
import EmployeeCard from "../../Components/Cards/EmployeeCard";
import deleteIcon from "../../images/deleteIcon.png";
import editIcon from "../../images/Edit.svg";
import saveData from "../../images/Check.svg";

function Project() {
  //get the project id from parent
  const id = useLocation().state.id;

  const [data, setData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState({
    project_name: null,
    project_description: null,
    proj_start_date: null,
    proj_due_date: null,
  });
  // const [roleToUpdate, setRoleToUpdate] = useState({
  //   role_id: null,
  // });

  let [edit, setEdit] = useState(false);

  // frontend and backend urls
  let url = FetchUrl.fetchUrl;
  let frontendUrl = FetchUrl.frontendLink;

  // fetch project data
  const getData = () => {
    axios
      .get(`${url}/api/project/${id}`, { crossdomain: true })
      .then((response) => {
        setData(response.data.data);
        // console.log(response.data.data);
        if (response.data.data.team_id) {
          axios
            .get(`${url}/api/team/${response.data.data.team_id}`)
            .then((teamData) => {
              setTeamMembers(teamData.data.data.employee);
              // console.log(`team members: `, teamData.data.data.employee);
            });
        }
      });
  };

  // get all teams
  const getAllTeams = () => {
    axios.get(`${url}/api/team`, { crossdomain: true }).then((response) => {
      setTeams(response.data.data);
      // console.log(response.data.data);
    });
  };

  // Get all roles
  const getAllRoles = () => {
    axios.get(`${url}/api/role`, { crossdomain: true }).then((response) => {
      setRoles(response.data.data);
      // console.log(response.data.data);
    });
  };

  // Edit page content
  const editContent = () => {
    getAllTeams();
    setEdit((prevEdit) => (edit = !prevEdit));
  };

  // Save page content
  const saveContent = () => {
    axios
      .post(`${url}/api/project/edit/${id}`, dataToUpdate)
      .then((response) => {
        // console.log(response.data);
        setEdit(false);
        getData();
      });
    // if (roleToUpdate.role_id != null) {
    //   axios
    //     .post(`${url}/api/employee/attach-role`, roleToUpdate)
    //     .then((response) => {
    //       console.log(response.data);
    //     });
    // }
  };

  const handleChange = (e) => {
    let targetName = e.target.name;
    let value = e.target.value;
    if (value == "-1") value = null;
    setDataToUpdate({ ...dataToUpdate, [targetName]: value });
    // console.log(dataToUpdate);
  };
  const handleRoleChange = (e) => {
    // console.log(e.target);
    let employee_id = e.target.getAttribute("data-employee-id");
    let value = e.target.value;
    let roleToUpdate = {
      role_id: value,
      project_id: id,
    };
    // console.log(roleToUpdate);
    axios
      .post(`${url}/api/employee/attach-role/${employee_id}`, roleToUpdate)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const removeTeam = () => {
    if (
      window.confirm(
        "Are you sure you want to remove the team from this project?"
      )
    ) {
      axios
        .post(`${url}/api/project/edit/${id}`, { team_id: 0 })
        .then((response) => {
          // console.log(response);
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteProject = () => {
    if (window.confirm(`Do you want to delete this Project?`)) {
      axios.delete(`${url}/api/project/${id}`).then((response) => {
        if (response.data.status === 401) {
          alert(response.data.message);
        } else if (response.data.status === 201) {
          alert(response.data.message);
          window.location.replace(`${frontendUrl}/projects`);
        }
        // console.log(response.data.status);
      });
    }
  };

  useEffect(() => {
    getData();
    getAllTeams();
    getAllRoles();
  }, []);

  return (
    data && (
      <div id="project">
        <a href="/projects">
          <img src={back} alt="go back" />
          <h3>Go back</h3>
        </a>
        <img
          id="project_edit_content"
          src={editIcon}
          alt="edit project content"
          onClick={editContent}
        />
        {edit && (
          <img
            id="project_save_content"
            src={saveData}
            alt="save"
            onClick={saveContent}
          />
        )}

        <div className="first_container">
          <div className="first_container_child1">
            {!edit && <h1>{data.project_name}</h1>}
            {edit && (
              <div>
                <h3>Change project name:</h3>
                <input
                  name="project_name"
                  type="text"
                  defaultValue={data.project_name}
                  onChange={handleChange}
                />
              </div>
            )}
            <br />
            {!edit && <p>{data.project_description}</p>}
            {edit && (
              <div>
                <h3>Change project description:</h3>
                <textarea
                  name="project_description"
                  type="text"
                  defaultValue={data.project_description}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className="first_container_child2">
            {!edit && (
              <div>
                <h4>Project start date:</h4>
                <p>{data.proj_start_date}</p>
              </div>
            )}
            {edit && (
              <div>
                <h3>Change project start date:</h3>
                <input
                  name="proj_start_date"
                  type="date"
                  defaultValue={data.proj_start_date}
                  onChange={handleChange}
                />
              </div>
            )}
            <br />
            {!edit && (
              <div>
                <h4>Project due date:</h4>
                <p>{data.proj_due_date}</p>
              </div>
            )}
            {edit && (
              <div>
                <h3>Change project due date:</h3>
                <input
                  name="proj_due_date"
                  type="date"
                  defaultValue={data.proj_due_date}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>
        <hr />

        <div className="second_container">
          <h2>Responsible Team</h2>
          <br />

          {!edit && !data.teams && <p>No responsible team</p>}
          {data.teams && (
            <Link to="../teams/oneteam" state={{ id: data.team_id }}>
              <TeamCard name={data.teams.team_name} />
            </Link>
          )}
          {edit && data.teams && (
            <button value={data.team_id} onClick={removeTeam}>
              Remove Team
            </button>
          )}
          {edit && data && !data.team_id && (
            <select name="team_id" onChange={handleChange}>
              <option value="-1">--no change--</option>
              {teams &&
                teams.map((team, index) => {
                  return (
                    <option key={index} value={team.id}>
                      {team.team_name}
                    </option>
                  );
                })}
            </select>
          )}
          <br />
          <br />
          <h2>Team members responsible</h2>
          <br />
          {(!data.employees || data.employees.length === 0) && (
            <p>No responsible employees</p>
          )}
          <div className="project_employees">
            {data.employees &&
              data.employees.map((employee, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={"../employees/employee"}
                      state={{ id: employee.id }}
                    >
                      <EmployeeCard
                        name={employee.emp_first_name}
                        email={employee.email}
                        phone={employee.phone}
                        source={employee.employeeImage}
                        team={employee.team_id}
                        role={employee.pivot.role_id.role_name}
                      />
                    </Link>
                    {/* {edit && <h3>Change role:</h3>}
                    {edit && (
                      <select
                        data-employee-id={employee.id}
                        name="role_id"
                        onChange={handleRoleChange}
                      >
                        {roles.map((role, index) => {
                          return (
                            <option key={index} value={role.id}>
                              {role.role_name}
                            </option>
                          );
                        })}
                      </select>
                    )} */}
                  </div>
                );
              })}
          </div>

          {edit && (
            <div>
              <h2>All team members</h2>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {teamMembers &&
                  teamMembers.map((employee, index) => {
                    return (
                      <div key={index}>
                        <Link
                          to={"../employees/employee"}
                          state={{ id: employee.id }}
                        >
                          <EmployeeCard
                            name={employee.emp_first_name}
                            email={employee.email}
                            phone={employee.phone}
                            source={employee.employeeImage}
                            team={employee.team_id}
                          />
                        </Link>
                        {edit && <h3>Assign role:</h3>}
                        {edit && (
                          <select
                            data-employee-id={employee.id}
                            name="role_id"
                            onChange={handleRoleChange}
                          >
                            <option>--no role--</option>
                            {roles.map((role, index) => {
                              return (
                                <option key={index} value={role.id}>
                                  {role.role_name}
                                </option>
                              );
                            })}
                          </select>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div className="delete_project" onClick={deleteProject}>
          <p>Delete Project</p>
          <img src={deleteIcon} alt="delete project" />
        </div>
      </div>
    )
  );
}

export default Project;
