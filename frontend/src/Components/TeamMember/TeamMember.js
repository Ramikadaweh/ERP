import snow from "./snow.jpg";
import "./TeamMember.css";


const TeamMember = ({ name,pic }) => {

  return (
    <div className="membercard">
        <img src={snow} alt="snow"></img>
        <p>{name}</p>
    </div>
  );
};

export default TeamMember;