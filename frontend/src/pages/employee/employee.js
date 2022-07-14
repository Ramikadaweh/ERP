import React, { useState, useEffect } from "react";
import TeamCard from '../../Components/Cards/TeamCard'
import ProjectCard from '../../Components/Cards/ProjectCard'
import '../../App.css';
import deleteIcon from '../../images/deleteIcon.png'
import './employee.css';
import { MdReply } from "react-icons/md";
import employeeImage from '../../images/employeeImage'
import addIcon from '../../images/addIcon.png'
import CircularProgress from '../../Components/circul/circle';
import editBtn from '../../images/Edit.svg';
import avator from '../../images/avatar.png'
import { BsFillPencilFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BsXCircleFill } from "react-icons/bs";
import plus from '../../images/plus.png'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from "axios";
import { Link, useLocation,useNavigate } from "react-router-dom";
import FetchUrl from '../../url';
import '../../Components/Modals/modal.css';
function Employee() {
    const navigate = useNavigate();
    let url = FetchUrl.fetchUrl;
    let frontendUrl = FetchUrl.frontendLink;
    const [data, setData] = useState([])
    const [picture, setPicture] = useState(null);
    const [project, setProject] = useState([])
    const [role, setRole] = useState([]);
    const [show, setShow] = useState(true);
    const [kpi, setKpi] = useState([])
    const [team, setTeam] = useState([])
    const [newrole, setNewrole] = useState({
        project_id: "",
        role_id: "",

    })

    const id = useLocation().state.id;
    // console.log(`${id}`);
    const getData = () => {
        axios.get(`${url}/api/employee/${id}`, { crossdomain: true }).then(response => {
            setData(response.data.data);
            // console.log(response.data.data.picture)
        });
    }
    const uploadImage = async (event) => {
        console.log(event.target.files[0]);
        setPicture(event.target.files[0]);
        // e.preventDefault();
        const savedImage = new FormData();
        savedImage.append('picture', picture);
        await axios.post(`${url}/api/employee/updateImage/${id}`, savedImage)
            .then(res => {
                setPicture(res.data.data.picture);

                getData();
            }).catch((error) => {
                console.log('Error', error);
            })
    }
    const submitImage = async (e) => {
        e.preventDefault();
        const savedImage = new FormData();
        savedImage.append('picture', picture);
        await axios.post(`${url}/api/employee/updateImage/${id}`, savedImage)
            .then(res => {
                setPicture(res.data.data.picture);

                getData();
            }).catch((error) => {
                console.log('Error', error);
            })
    }
    const deleteEmployee = (id) => {

        confirmAlert({
            title: 'Are you sure',
            message: 'do you want to delete this employee.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`${url}/api/employee/${id}`, { crossdomain: true }).then(response => {
                            window.location.replace(`${frontendUrl}/employees`);
                        }).catch(error=>{
                            console.log(error)
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    // const deleteEmployee = (id) => {
    //     if (window.confirm(`Do you want to delete this employee?`)) {
    //         let response = axios.delete(`${url}/api/employee/${id}`, { crossdomain: true }).then(response => {
    //             setTimeout("location.reload(true)", 0);
    //         })
    //         try {
    //             alert(response.data.message);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
    const attachKPI = (e) => {
        e.preventDefault();
        let kpi_id = document.getElementById("kpi_name_emp");
        let evaluation = document.getElementById("kpi_rate_emp");
        if (parseInt(evaluation.value) <= 10) {
            axios.post(`${url}/api/employee/attach-kpi/${data.id}`, { kpi_id: kpi_id.value, evaluation: evaluation.value }).then(response => {
                getData();
            })
        }
        else 
        {
            confirmAlert({
                title: 'kpi rate can not be > 10',
               
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                           
                            }
                    },
                ]
            });
        }
    }
    const detachKPI = (kpi) => {

        confirmAlert({
            title: 'Are you sure',
            message: `do you want to dettach this kpi for ${data.emp_first_name}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post(`${url}/api/employee/detach-kpi/${data.id}`, { kpi_id: `${kpi}` }).then(response => {
                            getData();
                
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }



    const attachTeam = (e) => {
        e.preventDefault();
        let team_id = document.getElementById("addTeam_emp");
        axios.post(`${url}/api/employee/attach-team/${data.id}`, { team_id: team_id.value }).then(response => {
            getData();
        }
        )
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(value)
        setData({ ...data, [e.target.name]: value });
        console.log()
    }
    const handleSubmission = (e) => {
        e.preventDefault();

        axios.post(`${url}/api/employee/${data.id}`, { emp_first_name: data.emp_first_name, emp_last_name: data.emp_last_name, email: data.email, phone: data.phone, picture: data.picture }).then(response => {
            getData();
            document.getElementById('edit_btn').style.display = 'none';
            document.getElementById('add_image_btn').style.display = 'none';
            document.getElementById('first_name').disabled = true;
            document.getElementById('last_name').disabled = true;
            document.getElementById('email').disabled = true;
            document.getElementById('phone').disabled = true;

        })
    }
    const edit = () => {

        if (show) {
            let first_name = document.getElementById('first_name');
            let last_name = document.getElementById('last_name');
            let email = document.getElementById('email');
            let phone = document.getElementById('phone');
            document.getElementById('edit_btn').style.display = 'block';
            document.getElementById('add_image_btn').style.display = 'block';
            first_name.disabled = false;
            last_name.disabled = false;
            email.disabled = false;
            phone.disabled = false;
            setShow(false);
        }
        else {
            let first_name = document.getElementById('first_name');
            let last_name = document.getElementById('last_name');
            let email = document.getElementById('email');
            let phone = document.getElementById('phone');
            document.getElementById('edit_btn').style.display = 'none';
            document.getElementById('add_image_btn').style.display = 'none';
            first_name.disabled = true;
            last_name.disabled = true;
            email.disabled = true;
            phone.disabled = true;
            setShow(true)
        }
        // console.log(first_name.value, last_name.value, email.value, phone.value, picture.value)
    }
    const attachRole = async (e, projecte) => {
        e.preventDefault();

        let role = document.getElementById("role_emp_new").value;

        // setNewrole({...newrole, project_id:project,role_id:role})

        console.log(data.id)
        console.log(project);
        console.log(role.value)
        console.log("hhh", newrole)
        try {
            const result = await axios.post(`${url}/api/employee/attachRole/${id}`, { role_id: role, project_id: projecte }, { crossdomain: true });
            getData();
            console.log("result: ", result);
        }
        catch (error) {
            console.log(error);
        }
    }
    const edit_evaluation = (e) => {
        e.preventDefault();
        if (show) {
            document.getElementById('evaluation').style.display = 'block';
            setShow(false)
        }
        else {
            document.getElementById('evaluation').style.display = 'none';
            setShow(true)
        }

    }
   
    const evaluationNew = async (e) => {
        e.preventDefault();
        let kpi = document.getElementById("new_rate");
        let rate = document.getElementById("kpi_new_rate");
        console.log({ kpi_id: kpi.value, evaluation: rate.value })
        if (parseInt(rate.value) <= 10) {
            
            try {
                await axios.post(`${url}/api/employee/evaluation/${data.id}`, { kpi_id: kpi.value, evaluation: rate.value }, { crossdomain: true });
                getData();
                document.getElementById('evaluation').style.display = 'none';
            }
            catch (error) {
                console.log(error);
            }
        }
        else 
        {
            confirmAlert({
                title: 'kpi rate can not be > 10',
               
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                           
                            }
                    },
                ]
            });
        }
    }
    
    useEffect(() => {
        getData();
        axios.get(`${url}/api/project`, { crossdomain: true }).then(response => {
            setProject(response.data.data);
        });
      
        axios.get(`${url}/api/kpi`, { crossdomain: true }).then(response => {
            setKpi(response.data.data);
        });
        axios.get(`${url}/api/team`, { crossdomain: true }).then(response => {
            setTeam(response.data.data);
        });
        axios.get(`${url}/api/role`, { crossdomain: true }).then(response => {
            setRole(response.data.data);
        });
    }, [])

    return (
        <div className='employee'>
            {/* <div className='backbtn'>
                <div className='icon'><MdReply size={40} color='white' />
                </div>
                <div className='back'> Go back</div>
            </div> */}
            <div className='oneEmployee'>

                <div className='profileInformation'>

                    <div className='profile'>{console.log("zeinab ", data.picture)}
                        <div className='editIcon'>   <h1> Employee profile</h1><div><img src={editBtn} alt="edit" className="kpi-edit-btn" onClick={edit} /></div></div>
                        <div className="img_container">
                            {data && data.picture ? <img src={`${url}/${data.picture}`} alt="employee" /> : <img src={avator} alt="employee" className="avator_img" />}
                        </div>
                        <input type="file" id="actual-btn" hidden onChange={uploadImage} />
                        <label className="inputchangeImage" htmlFor="actual-btn"><img src={addIcon} alt="adIcon" className='addIcon' /></label>
                        <button className="input__uploadImage" id="add_image_btn" type="submit" onClick={submitImage} style={{ display: 'none' }}>Save Image</button>
                        {/* <img src={addIcon} alt="adIcon" className='addIcon'/> */}
                        <form>
                            <div><label htmlFor="id_employee">id :</label></div>
                            <div><input type="text" id="id_employee" className='id_employee' value={data.id} disabled /></div>
                            <div><label htmlFor="first_name">First name :</label></div>
                            <div><input type="text" id="first_name" className='first_name' name='emp_first_name' value={data.emp_first_name} onChange={handleOnChange} disabled /></div>
                            <div><label htmlFor="first_name">Last name :</label></div>
                            <div><input type="text" id="last_name" className='last_name' name='emp_last_name' value={data.emp_last_name} onChange={handleOnChange} disabled /></div>
                            <div><label htmlFor="email"> Email :</label></div>
                            <div><input type="email" id="email" className='email' name='email' value={data.email} onChange={handleOnChange} disabled /></div>
                            <div><label htmlFor="phone">Phone :</label></div>
                            <div><input type="text" id="phone" className='phone' name='phone' value={data.phone} onChange={handleOnChange} disabled /></div>
                            <div className="edit_btn_hide_div"><button id="edit_btn" className="edit_btn_hide" style={{ display: 'none' }} onClick={handleSubmission}>Accept changes</button></div>
                        </form>
                        {data.team_id == null &&
                            <div className="addTeam"> <div><img src={addIcon} alt="delete" onClick={attachTeam} /><p>attachteam</p></div>
                                <select id="addTeam_emp" className="filtartion emp_add_team">

                                    {team.map((data, index) => {

                                        return (

                                            <option key={index} value={data.id}>{data.team_name}

                                            </option>


                                        )
                                    })}

                                </select></div>
                        }
                        {data.teams &&
                            <div>
                                <h1>Team</h1>
                                <div id='emp_team_display'>
                                    <div >
                                    <Link to="../teams/oneteam" state={{ id: data.team_id }}>
              <TeamCard name={data.teams.team_name} />
            </Link> 
            {/* <button className="employee_team"><FiUsers/>{data.teams && data.teams['team_name']}</button> */}
                                        {/* <TeamCard name={data.teams && data.teams['team_name']} text="Lorprinting and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" /> */}
                                        {/* <div className="deleteIcon"> <img src={deleteIcon} alt="delete" onClick={deatachTeam} /></div> */}
                                    </div>

                                </div>
                            </div>
                        }
                        <div className='deleteIcon'><p> delete employee</p>
                            {/* <Link to="/employees"> */}
                            <div className="deleteIcon" onClick={() => deleteEmployee(data.id)}>
                                <img src={deleteIcon} alt="delete" />
                            </div>
                            {/* </Link> */}
                        </div>

                    </div>
                    <div className="currentProject">
                        <h1>Current Project with Role</h1>

                        <div className='employeeProject'>
                            {data.projects && data.projects.map((data, index) => {
                                return (
                                    <div>
                                        <Link to="../Projects/Project" state={{ id: data.id }}>

            
                                        <ProjectCard
                                            key={index}
                                            name={data.project_name}
                                            team={data.team_id}
                                            startDate={data.proj_start_date}
                                            dueDate={data.proj_due_date}
                                        />
                                        </Link>
                                        {data.pivot['role_id'] ?
                                            <button className="emp_add_role">{data.pivot.role_id["role_name"]}</button>
                                            : <select id="role_emp_new" onChange={(e) =>
                                                attachRole(e, data.id)}>
                                                <option selected disabled>Assign kpi</option>
                                                {role.map((role, index) => {
                                                    return (
                                                        <option key={index} value={role.id}>{role.role_name}
                                                        </option>

                                                    )
                                                }
                                                )}

                                            </select>

                                        }

                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
                <div className='Employee_kpi kpi_with_edit'>
                    <h1>Kpis</h1>

                    <div  className="kpi_edit_pen"><img src={editBtn} alt="edit" className="kpi-edit-evaluation kpi-edit-btn" onClick={edit_evaluation} /></div>
                    <form style={{ display: 'none' }} id="evaluation">
                        <div><label htmlFor="new_rate">choose Kpi to edit it</label></div>
                        <div> <select id="new_rate" className='filtartion new_rate'  >
                            {data.kpi && data.kpi.map((data, index) => {
                                return (
                                    <option key={index} value={data.id} >{data.kpi_name}</option>)

                            })}

                        </select></div>
                        <div> <label htmlFor="kpi_new_rate">KPI rating (/10) :</label></div>
                        <div className="addKpi"> <input type="number" id="kpi_new_rate" max='10' className='kpi_new_rate' />
                            <button type="submit" onClick={evaluationNew}>new evaluation</button></div>
                    </form>


                    <form>
                        <div><label htmlFor="kpi_name_emp">choose Kpi :</label></div>
                        <div> <select id="kpi_name_emp" className='filtartion kpi_name_emp' >
                            {kpi.map((data, index) => {
                                return (

                                    <option key={index} value={data.id} >{data.kpi_name}</option>
                                )
                            })}
                        </select></div>
                        <div> <label htmlFor="kpi_rate_emp">KPI rating (/10) :</label></div>
                        <div className="addKpi"> <input type="number" id="kpi_rate_emp" min='0' max='10' className='kpi_rate_emp' />
                            <button type="button" onClick={attachKPI}>add kpi</button></div>

                    </form>
                </div>
                <div className="">
                    <div className='employee_kpi_items'>
                        {data.kpi && data.kpi.map((data, index) => {
                            return (


                                <div className="kpi_circul">
                                    <CircularProgress
                                        key={index}
                                        skill={data.kpi_name}
                                        size={120}
                                        strokewidth={8}
                                        percentage={data.pivot && ((data.pivot['evaluation_kpi']) * 10)}
                                        color="#B82381"
                                    />
                                    <div className="deleteIcon">
                                        <img src={deleteIcon} alt="delete"
                                            onClick={() => detachKPI(data.id)}
                                        />
                                    </div>
                                </div>

                            )
                        })}

                    </div>

                </div>
            </div>

        </div >
    )
}
export default Employee;