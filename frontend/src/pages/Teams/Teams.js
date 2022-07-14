import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import TeamCard from '../../Components/Cards/TeamCard';
import '../../App.css';
import './team.css';
import Search from '../../Components/Search/Search';

function Employees() {
  return (
    <div>
      {/* <Navbar /> */}
      <Search title='Team' />
      <div className='teams_section'>
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <TeamCard name=" Team" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry" />


      </div>
    </div>
  )
}
export default Employees;
