import React from 'react'
import { GiSkills } from "react-icons/gi";
import './kpi_card.css'
 function KpiCard(props) {
  return (
    <div className='Kcard_section Kcard_kpi'>
      <div className="skills-icon"><GiSkills/></div>
      <h1>{props.name}</h1>
    </div>
  )
}
export default KpiCard ;