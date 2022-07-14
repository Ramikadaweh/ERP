import React from 'react'
import { IoPerson } from "react-icons/io5"; 
import { BsEnvelopeFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BsTelephoneFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import './card.css'
 function EmployeeCard(props) {
  return (
    <div className='card_section card_employee'>
     <div className='header'> <h1><img className="employeeImage" src={props.source}/> </h1><h1>{props.name}</h1></div>
   <div className='information'> <div className='header'> <p><BsEnvelopeFill/></p><p>{props.email}</p></div>
     <div className='header'> <p><BsTelephoneFill/></p><p>{props.phone}</p></div>
     <div className='header'> <p><BsFillPeopleFill/></p><p>{props.team}</p></div></div>
     <div className="employee_role">{props.role && <p>Role: <strong>{props.role}</strong></p>}</div>
    </div>
  )
}
export default EmployeeCard ;
