import React from 'react'
import { FiUsers } from "react-icons/fi";
import './card.css'
import './TeamCard.css'
 function EmployeeCard(props) {
  return (
    <div className='card_section card_team'>
      <h1> <FiUsers/> {props.name}</h1><br></br>
      <p style={{fontWeight:'bold'}}><span style={{fontWeight:'normal', fontSize:'100%'}}>created at:</span> {props.startDate}</p>

      <p>{props.text}</p>
    </div>
  )
}
export default EmployeeCard ;