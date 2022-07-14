import React from 'react'
import './card.css'
import { IoDocumentsSharp } from "react-icons/io5";
 function ProjectCard(props) {
  return (
    <a href="#">
      <div className='card_section card_project'>
        <IoDocumentsSharp/>
        <h1 style={{fontWeight:'bold'}}>{props.name}</h1>
        <p>team: {props.team}</p>
        <br/>
        <p style={{fontWeight:'bold'}}><span style={{fontWeight:'normal', fontSize:'11px'}}>Project start date:</span> {props.startDate}</p>
        <p style={{fontWeight:'bold'}}><span style={{fontWeight:'normal', fontSize:'11px'}}>Project due date:</span> {props.dueDate}</p>
      </div>
    </a>
  )
}
export default ProjectCard ;