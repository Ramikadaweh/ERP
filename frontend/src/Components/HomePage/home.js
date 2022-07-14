import FactCard from "../FactCard/factcard";
import logo from "./image_3.svg";
import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import FetchUrl from "../../url";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import out from "./logout.svg";
const Home = () => {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState("");
  const [message, setMessage] = useState({
    text: "",
    author: "",
  });
  try {
    let id = useLocation().state.id;
    localStorage.setItem("id", id);
  } catch (error) {}

  const navigate = useNavigate();
  const url = FetchUrl.fetchUrl;

  const checkToken = () => {
    axios
      .get(`${url}/api/admin/token/check`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data !== 1) navigate("/login");
        else setAuth(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const logout = () =>{
    localStorage.clear();
  }

  const getAdmin = () => {
    axios
      .get(`${url}/api/admin/${localStorage.getItem("id")}`)
      // rami
      .then((response) => setData(response.data.data));
  };
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let number = Math.floor(Math.random() * data.length);
        setMessage({
          ...message,
          text: data[number].text,
          author: data[number].author,
        });
      });
  }, []);
  useEffect(getAdmin, []);
  useEffect(checkToken, []);
  return (
    auth && (
      <div className="home_page">
        <div className="welcome">
          <h1>Welcome {data.full_name} </h1>
          <h5 style={{ color: "#bbc9e7" }}>{message.text}</h5>
          <p>
            <em>-{message.author}-</em>
          </p>
        </div>
        <div className="factor_card">
          <div className="emtea">
            <div className="employee">
              <a href="/employees">
                <FactCard title="Employees" />
              </a>
            </div>
            <div className="teamms">
              <a href="/teams">
                <FactCard title="Teams" />
              </a>
            </div>
          </div>
          <div className="prokp">
            <div className="prooo">
              <a href="/projects">
                <FactCard title="Projects" />
              </a>
            </div>
            <div className="kp">
              <a href="/kpis">
                <FactCard title="KPIs" />
              </a>
            </div>
          </div>
          <div className="repset">
            <div className="rep">
              <a href="/reports">
                <FactCard title="Reports" />
              </a>
            </div>
            <div></div>
          </div>
        </div>
        <Link to="/setting" state={{ id: data.id }}>
          <img className="setimg" src={logo} alt={"logo"}></img>
        </Link>
        <Link to="/login"><img src={out} className="out" onClick={logout}></img> </Link> 
      </div>
    )
  );
};

export default Home;
