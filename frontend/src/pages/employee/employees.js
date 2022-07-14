import React, { useState, useEffect } from "react";
import Navbar from '../../Components/Navbar/Navbar';
import EmployeeCard from '../../Components/Cards/EmployeeCard';
import employeeImage from '../../images/employeeImage';
import addIcon from '../../images/addIcon.png'
import avator from '../../images/avatar.png'
import { MdReply } from "react-icons/md";
import FetchUrl from '../../url';
import '../../App.css';
import './employee.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Search from '../../Components/Search/Search';
import Loader from "../../Components/Loader/Loader";

function Employees() {
  let url = FetchUrl.fetchUrl;
  const [data, setData] = useState([])
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  let [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const addButton = () => {
    if(show){
      document
      .getElementById('add_employee_section').style.maxHeight='800px';
    document
      .getElementsByClassName("addIcon")[0]
      .classList.toggle("button-rotate");
      setShow(false)
    }
    else{
      document
      .getElementById('add_employee_section').style.maxHeight=0;
      document
      .getElementsByClassName("addIcon")[0]
      .classList.toggle("button-rotate");
      setShow(true)
    }

  };
  const handleSearch = (data) => {
    setSearch(data.toLowerCase());
  };
  const handldSort = (sortedData) => {
    setData([...sortedData]);
  }
  const filteredData = data.filter((el) => {

    if (search === "") {
      return el;
    }
    else {
      return el.emp_first_name.toLowerCase().includes(search);
    }
  });
  const [team, setTeam] = useState([])
  const [picture, setPicture] = useState(null)
  const [employee, setEmployee] = useState({
    emp_first_name: "",
    emp_last_name: "",
    email: "",
    phone: "",
    team_id: "",
  });
  const uploadImage = (event) => {
    console.log(event.target.files[0]);
    setPicture(event.target.files[0]);
  }
  const handleOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
    if (e.target.name === "team_id") {
      e.target.value = e.target.options.selectedIndex;
      if (value === 0) e.target.value = null;
    }
    console.log(employee)
  }
  const handleSubmission = async (e) => {
    e.preventDefault();
    const savedImage = new FormData();
    savedImage.append("picture", picture);
    savedImage.append("emp_first_name", employee.emp_first_name);
    savedImage.append("emp_last_name", employee.emp_last_name);
    savedImage.append("email", employee.email);
    savedImage.append("phone", employee.phone);
    savedImage.append("team_id", employee.team_id);
    await axios.post(`${url}/api/employee`, savedImage).then((response) => {
      document
      .getElementById('add_employee_section').style.display='none';
      document
      .getElementsByClassName("addIcon")[0]
      .classList.toggle("button-rotate");
      setShow(true)
     getData();

    })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    axios.get(`${url}/api/team`, { crossdomain: true }).then(response => {
      setTeam(response.data.data);
    });
  }, [])
const getData =  ()=>{
  axios.get(`${url}/api/employee`, { crossdomain: true }).then(response => {
    setData(response.data.data);
    console.log(response.data.data)
    setLoader(false);
  });
}
  useEffect(() => {
   getData();
  }, [])

  return (
    <div>
    {loader && <Loader />}
      {!loader && (
    <div>
     {/* <Navbar /> */}
      <Search data={data} title='Employee' handledSort={handldSort} handleSearch={handleSearch} addButton={addButton} />
      <div id="add_employee_section" className='addEmployee'>

        <h1>Add Employee</h1>
        <form>

          <div><label htmlFor="first_name">First name :</label></div>
          <div><input type="text" id="first_name" className='first_name' name='emp_first_name' value={employee.emp_first_name} onChange={handleOnChange} /></div>
          <div><label htmlFor="first_name">Last name :</label></div>
          <div><input type="text" id="last_name" className='last_name' name='emp_last_name' value={employee.emp_last_name} onChange={handleOnChange} /></div>
          <div><label htmlFor="email"> Email :</label></div>
          <div><input type="email" id="email" className='email' name='email' value={employee.email} onChange={handleOnChange} /></div>
          <div><label htmlFor="phone">Phone :</label></div>
          <div><input type="text" id="phone" className='phone' value={employee.phone} name='phone' onChange={handleOnChange} /></div>
          <div><label htmlFor="employee_image">profile picture :</label></div>
          <div className="avator"><img src={avator} alt="employee" className="avator_img" />
            <input type="file" id="actual-btn" hidden onChange={uploadImage} />
            <label className="addnewemp" htmlFor="actual-btn"><img src={addIcon} alt="adIcon" className='addIcon' /></label>
            <button className="input__uploadImage" id="add_image_btn" type="submit" style={{ display: 'none' }}>Save Image</button>  </div>              <div className="addTeam">
            <select id="addTeam_emp" className="filtartion emp_add_team" name="team_id" onChange={handleOnChange} value={employee.team_id}>
              {team.map((data, index) => {
                return (
                  <option key={index} value={data.id}>{data.team_name}

                  </option>
                )
              })}

            </select>

          </div>
          <div className="div_btn_add_employee"><button  type="submit" onClick={handleSubmission}>add employee</button></div>
        </form>
      </div>
      <div className='employee_section'>
        {data && filteredData.map((data, index) => {
          const one = data.emp_first_name;
          const two = data.emp_last_name;
          return (
            <Link to="employee" state={{ id: data.id }} key={index}><EmployeeCard name={`${one} ${two}`} email={data.email} phone={data.phone} source={`${url}/${data.picture}`} team={data.team_id} /></Link>
          )
        })}
        {/* <EmployeeCard name="" email="rima@gamil.com" phone="03158025" source={employeeImage} team="team"/> */}
      </div>
      </div>
)}
    </div>
  );
}
export default Employees;
