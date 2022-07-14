import React, { useEffect, useState } from "react";
import "../Search/Search.css";
import './SearchTeam.css'
import addIcon from "../../images/addIcon.png";
import axios from "axios";
import FetchUrl from "../../url";

let url = FetchUrl.fetchUrl;

function SearchTeam(props) {

    const [showForm, setFormStatus] = useState(false);
    const viewData = () => setFormStatus(true);
    const cancelData = () => setFormStatus(false);
    const [team_name, setName] = useState('');
  


     useEffect(()=>{
      getAllTeam();
    })

    const getAllTeam=()=>{
      axios
      .get(`${url}/api/team`)
      .then((response) => {
        const AllData = response.data.data;
        console.log(AllData);
      })
      .catch((err) => console.log(err));
    }
 

    function onAddTeam(e) {
      e.preventDefault();
      const postTeam = {
        team_name,
      };
  
      axios
        .post(`${url}/api/team`, postTeam)
        .then((Response) => {
          getAllTeam();
          console.log(Response);
        })
        .catch((error) => {
          console.log(error);
        });
        document.getElementById("team_form").reset();
  
    }
  

  const onSortChange = (e) => {
    let sort = e.target.value;

    if (sort === "name") {
      props.data.sort((a, b) => {
        if (a.team_name > b.team_name) {
          return 1;
        }
        if (b.team_name > a.team_name) {
          return -1;
        }
        return 0;
      });
    }
    if (sort === "date") {
      props.data.sort((a, b) => {
        return a.team_id - b.team_id;
      });
    }
    props.handledSort(props.data);
  };

  const handleSearch = (e) => {
    props.handleSearch(e.target.value);
  };

  return (
    <div className="search_section">
      <div className="search_employee">
        <h1>{props.title}</h1>
        <input type="search" placeholder="Search" onChange={handleSearch} />
      </div>
      <div className="add_employee_icon">
        <img src={addIcon} alt="adIcon" className="addIcon" onClick={viewData}/>
        <p>Add {props.title}</p>
      </div>
      <div className="divForm">
      {showForm && (
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
              <button onClick={cancelData} className="cancel">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="filter_div">
        <p>filter by :</p>
        <select className="filtration" onChange={onSortChange}>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="search_filtration">
        <input type="search" />
      </div>
    </div>
  );
}

export default SearchTeam;