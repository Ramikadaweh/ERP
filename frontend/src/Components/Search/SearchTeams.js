import React, { useState } from "react";
import "./Search.css";
import addIcon from "../../images/addIcon.png";
import addIconRed from "../../images/addIconRed.png";
function Search(props) {
  const [image, setImage] = useState(addIcon)
  const onSortChange = (e) => {
    let sort = e.target.value;

    if (sort === "name") {
      props.data.sort((a, b) => {
        if (a.team_name > b.team_name) {
          return -1;
        }
        if (b.team_name > a.team_name) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "Date") {
      props.data.sort((a, b) => {
        return b.created_at - a.created_at;
      });
    }
    props.handledSort(props.data);
  };

  const handleSearch = (e) => {
    props.handleSearch(e.target.value);
  };

  const addButton =() => {
    props.addButton();
    if(image === addIcon) setImage(addIconRed)
    if(image === addIconRed) setImage(addIcon)
  }

  return (
    <div className="search_section">
      <div className="search_employee">
        <h1>{props.title}</h1>
        <input type="search" placeholder="Search" onChange={handleSearch} />
      </div>
      <div className="add_employee_icon">
        {/* <IoIosAdd color='white' size={70}/> */}
        <img src={image} alt="adIcon" className="addIcon" onClick={addButton}/>
        <p>Add {props.title}</p>
      </div>
      <div className="filter_div">
        <p>Sort by :</p>
        <select className="filtration" onChange={onSortChange}>
          <option value="name">Name</option>
          <option value="Date">Date</option>
        </select>
      </div>
   
    </div>
  );
}

export default Search;
