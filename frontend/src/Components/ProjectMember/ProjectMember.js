import React from "react";
import "./ProjectMember.css";

const ProjectMember = ({name}) => {
  return (
    <div className="project_member">
       <p>{name}</p>
    </div>
  );
};

export default ProjectMember;