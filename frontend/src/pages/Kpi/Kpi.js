import React, { useEffect, useState } from "react";
import FetchUrl from "../../url";
import Card from "../../Components/Cards/TeamCard";
import "./kpi.css";
import plus from "../Reports/plus.png";
import deleteBtn from "../../images/delete.png";
import editBtn from "../../images/Edit.svg";
import axios from "axios";
import KpiCard from "../../Components/Cards/KpiCard";
import Navbar from "../../Components/Navbar/Navbar";
import Loader from "../../Components/Loader/Loader";

function Kpi() {
  let url = FetchUrl.fetchUrl;

  const [kpis, setKpis] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  let [edit, setEdit] = useState(false);
  let [loader, setLoader] = useState(true);

  async function onSubmit(e) {
    e.preventDefault();
    let kpiName = document.getElementById("kpi_name");
    if (!kpiName.value) {
      setMessage("Please enter a kpi name");
      return;
    }

    let response = await axios.post(`${url}/api/kpi`, {
      kpi_name: kpiName.value,
    });
    try {
      setMessage(response.data.message);
      getdata();
      // console.log(response.data.message);
      kpiName.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange() {
    setMessage("");
  }

  const editItems = (e) => {
    setEdit((prevEdit) => (edit = !prevEdit));
    let kpiCard = document.getElementsByClassName("kpi_card");
    kpiCard = Array.prototype.slice.call(kpiCard);
    kpiCard.forEach((element) => {
      element.classList.toggle("shake");
    });
  };

  async function deleteKpi(e) {
    let kpi_id = e.target.getAttribute("data-id");
    if (window.confirm(`Do you want to delete this Kpi?`)) {
      let response = await axios.delete(`${url}/api/kpi/${kpi_id}`);
      try {
        alert(response.data.message);
        getdata();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  let filteredData = [];
  if(kpis) filteredData = (kpis.filter((el) => {
    //if no input the return the original
    if (search === "") {
      return el;
    }
    //returns the item which contains the user input
    else {
      return el.kpi_name.toLowerCase().includes(search);
    }
  }))

  function getdata() {
    axios
      .get(`${url}/api/kpi`)
      .then((response) => {
        setKpis(response.data.data);
        setLoader(false);
        // console.log(response.data);
      })
      .catch((err) => console.dir(err));
  }
  useEffect(getdata, []);
  useEffect(() => {
    setTimeout(() => setMessage(""), 10000);
  }, [message]);

  return (
    <div id="kpi_page">
      {/* <Navbar /> */}
      {loader && <Loader />}
      {!loader && (
        <div className="kpis-wrapper">
          <div className="kpi-header">
            <img
              src={editBtn}
              alt="edit"
              className="kpi-edit-btn"
              onClick={editItems}
            />
            <div className="add_kpi">
              <div className="kpi-header-title">
                <h1>KPIs</h1>
              </div>
            </div>
            <div className="kpi-search-bar">
              <input
                type="text"
                name="search-kpi"
                id="search-kpi"
                onChange={handleSearch}
                placeholder="Search Bar"
              />
            </div>
          </div>
          <hr />
          <div className="kpi_collection">
            {filteredData &&
              filteredData.map((kpi, index) => {
                return (
                  <div key={index} className="kpi_card">
                    <KpiCard name={kpi.kpi_name} />
                    {edit && (
                      <img
                        className="delete-btn"
                        src={deleteBtn}
                        alt="delete kpi"
                        data-id={kpi.id}
                        onClick={deleteKpi}
                      />
                    )}
                  </div>
                );
              })}
          </div>
          <div className="form">
            <form>
              <input
                type="text"
                name="kpi_name"
                id="kpi_name"
                placeholder="Add a KPI"
                onChange={handleChange}
              />
              <button id="add_kpi_button" onClick={onSubmit}>
                <img src={plus} alt="Create Report" />
              </button>
            </form>
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kpi;
