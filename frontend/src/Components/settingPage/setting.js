import React, { useEffect, useState } from "react";
import Admin from "../adminCard/admin";
import logo from "../HomePage/image_3.svg";
import add from "./add.svg";
import editBtn from "../../images/Edit.svg";
import home from "./home.svg";
import dele from "./delete.svg";
import minus from "./minus.svg";
import "./setting.css";
import axios from "axios";
import FetchUrl from "../../url";
import { useLocation } from "react-router-dom";

let url = FetchUrl.fetchUrl;

const Setting = () => {
  const [showForm, setFormStatus] = useState(false);
  const viewData = () => setFormStatus(true);
  const cancelData = () => setFormStatus(false);

  const focusin = () => {
    document.getElementById("myText").disabled = false;
    document.getElementById("myText2").disabled = false;
    document.getElementById("myText").focus();
  };

  const [full_name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmation] = useState("");

  const [role_name, setRole_name] = useState("");
  const [admin, setAdmin] = useState([]);
  const [role, setRole] = useState([]);
  const [oneadmin, setOneadmin] = useState("");

  const id = useLocation().state.id;
  console.log(`${id}`);

  useEffect(() => {
    axios
      .get(`${url}/api/admin/${id}`)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        setOneadmin(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function onAddAdmin(e) {
    e.preventDefault();
    const postAdmin = {
      full_name,
      password,
      password_confirmation,
    };

    axios
      .post(`${url}/api/admin`, postAdmin)
      .then((Response) => {
        getAllAdmin();
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
    document.getElementById("admin_form").reset();
  }

  function onAddRole(e) {
    e.preventDefault();
    const postRole = {
      role_name,
    };

    axios
      .post(`${url}/api/role`, postRole)
      .then((Response) => {
        getAllRole();
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });

    document.getElementById("role_form").reset();
  }

  function editAdmin(e) {
    e.preventDefault();
    const editAdmin = {
      full_name,
      password,
    };
    axios
      .post(`${url}/api/admin/${id}`, editAdmin)
      .then((Response) => {
        getAllAdmin();
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
    document.getElementById("setting_form").reset();
  }

  useEffect(() => {
    getAllAdmin();
    getAllRole();
  }, []);

  const getAllAdmin = () => {
    axios
      .get(`${url}/api/admin`)
      .then((response) => {
        const AllData = response.data.data;
        console.log(response.data.data);
        setAdmin(AllData);
      })
      .catch((err) => console.log(err));
    document.getElementById("myText").disabled = true;
    document.getElementById("myText2").disabled = true;
  };

  const getAllRole = () => {
    axios
      .get(`${url}/api/role`)
      .then((response) => {
        const roleData = response.data.data;
        console.log(roleData);
        setRole(roleData);
      })
      .catch((err) => console.log(err));
  };

  const deleteAdmin = (e) => {
    let admin_id = e.target.getAttribute("data-id");
    console.log(admin_id);
    axios
      .delete(`${url}/api/admin/${admin_id}`)
      .then((res) => {
        console.log(res.data.message);
        getAllAdmin();
      })
      .catch((err) => console.log(err));
  };

  const deleteRole = (e) => {
    let role_id = e.target.getAttribute("data-id");
    console.log(role_id);
    axios
      .delete(`${url}/api/role/${role_id}`)
      .then((res) => {
        console.log(res.data.message);
        getAllRole();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="setting_page">
      <div className="first_part">
        <img src={logo} alt={"logo"}></img>
        <h1>Settings</h1>
        <p>
          <h3>Here you can :</h3>
          <br></br>
          1-Edit your name and password<br></br>
          2-Add and delete admins<br></br>
          3-Add and delete roles<br></br>
        </p>
      </div>
      <div className="second">
        <div>
          <img
            src={editBtn}
            alt="edit"
            className="kpi-edit-btn"
            onClick={focusin}
          />
        </div>
        <form className="setting_form" readonly>
          <h2>Name:</h2>
          <input
            type="text"
            id="myText"
            defaultValue={oneadmin.full_name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br></br>
          <p>password:</p>
          <input
            type="text"
            id="myText2"
            onChange={(e) => setPassword(e.target.value)}
            hashed
          ></input>
          <div className="editAdmin_btn_div">
            <button className="editAdmin_btn" onClick={editAdmin}>
              edit
            </button>
          </div>
        </form>
        <div className="add_admin">
          <h2>Admins</h2>
          <a onClick={viewData}>
            <img src={add} alt={"add admin"}></img>
          </a>
        </div>
        {showForm && (
          <form id="admin_form">
            <p>Name:</p>
            <input
              type="text"
              name="full_name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <br></br>
            <p>password:</p>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br></br>
            <p>Confirm password:</p>
            <input
              name="password_confirmation"
              type="text"
              onChange={(e) => setConfirmation(e.target.value)}
            ></input>
            <br></br>
            <div className="savcan">
              <button
                type="submit"
                onClick={onAddAdmin}
                value="Submit"
                className="save"
              >
                Save
              </button>
              <button onClick={cancelData} className="cancel">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="addmin_member">
          {admin &&
            admin.map((item, index) => {
              return (
                <div>
                  <Admin key={index} name={item.full_name} />
                  <img
                    data-id={item.id}
                    src={dele}
                    alt={"delete admin"}
                    onClick={deleteAdmin}
                  ></img>
                </div>
              );
            })}
        </div>
        <hr />
        <div className="add_role">
          <h2>Add Role</h2>
          <form id="role_form">
            <input
              type="text"
              name="role_name"
              onChange={(e) => setRole_name(e.target.value)}
            ></input>
            <img src={add} onClick={onAddRole} alt={"add admin"}></img>
          </form>
          <ul>
            {role &&
              role.map((item, index) => {
                return (
                  <li key={index} name={item.role_name}>
                    {item.role_name}
                    <img
                      data-id={item.id}
                      onClick={deleteRole}
                      className="minus_role"
                      src={minus}
                      alt="delete role"
                    ></img>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;
