import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './employee.css';
import { MdReply } from "react-icons/md";
import FetchUrl from '../../url';
import axios from "axios";
import addIcon from '../../images/addIcon.png'
import avator from '../../images/avatar.png'
import Employee from "./employee";
export default function AddEmployee() {
    let url = FetchUrl.fetchUrl;
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
            console.log(response);
        })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        axios.get(`${url}/api/team`, { crossdomain: true }).then(response => {
            setTeam(response.data.data);
        });
    }, [])

    return (

        <div className='addEmployee'>
            <div className='backbtn'>
                <div className='icon'><MdReply size={40} color='white' />
                </div>
                <div className='back'> Go back</div>
            </div>
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
                <button type="submit" onClick={handleSubmission}>add e,ployee</button>
            </form>
        </div>
    )
}
