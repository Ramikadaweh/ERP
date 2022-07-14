import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import EmployeeCard from "../Cards/TeamCard";
import FetchUrl from "../../url";
import "../../App.css";
import "./teamss.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import SearchTeam from "../Search/SearchTeams";
function Teamss() {
  let url = FetchUrl.fetchUrl;
  const [team_name, setName] = useState("");
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    getAllTeam();
  }, []);

  const getAllTeam = () => {
    axios
      .get(`${url}/api/team`)
      .then((response) => {
        setTeams(response.data.data);
        setLoader(false);
        // console.log(AllData);
      })
      .catch((err) => console.log(err));
  };

  const filteredData = teams.filter((el) => {
    //if no input the return the original
    if (search === "") {
      return el;
    }
    //returns the item which contains the user input
    else {
      return el.team_name.toLowerCase().includes(search);
    }
  });

  function onAddTeam(e) {
    e.preventDefault();
    const postTeam = {
      team_name,
    };

    axios
      .post(`${url}/api/team`, postTeam)
      .then((Response) => {
        console.log(Response);
        getAllTeam();
      })
      .catch((error) => {
        console.log(error);
      });
    document.getElementById("team_form").reset();
  }

  const handledSort = (sortedData) => {
    setTeams([...sortedData]);
  };

  const handleSearch = (data) => {
    setSearch(data.toLowerCase());
  };

  const addForm = () => {
    document
      .getElementsByClassName("add-team")[0]
      .classList.toggle("toggle-add-team");

    document
      .getElementsByClassName("addIcon")[0]
      .classList.toggle("button-rotate");
  };

  return (
    <div>
      {/* <Navbar /> */}
      {loader && <Loader />}
      {!loader && (
        <div>
          <SearchTeam
            addButton={addForm}
            data={teams}
            title="Team"
            sorting={handledSort}
            handleSearch={handleSearch}
          />
          <div className="form_card">
            <div className="add-team toggle-add-team">
              <form id="team_form">
                <p>Team Name:*</p>
                <input
                  type="text"
                  name="team_name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <div className="savcan">
                  <button
                    type="submit"
                    onClick={onAddTeam}
                    value="Submit"
                    className="save"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="team_section">
              {filteredData &&
                filteredData.map((item, index) => {
                  var dateObj = new Date(item.created_at);
                  var month = dateObj.getUTCMonth() + 1; //months from 1-12
                  var day = dateObj.getUTCDate();
                  var year = dateObj.getUTCFullYear();
                  let newdate = year + "/" + month + "/" + day;
                  return (
                    <div>
                      <Link to="oneteam" state={{ id: item.id }}>
                        <EmployeeCard
                          key={index}
                          name={item.team_name}
                          startDate={newdate}
                        />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Teamss;
