import { NavLink } from "react-router-dom"
import "../App.css"

export function UserAccountButton() {
    return (
      <div className="profile-button">
        <div>
          <img src="/icon-profile.svg" alt="profile image" style={{width: "33px"}}/>
        </div>
  
        <div className="dropdown">
          <NavLink to="/login"><p className="dropdown-button">LOG IN</p></NavLink>
          <NavLink to="/signup"><p className="dropdown-button">SIGN UP</p></NavLink>
        </div>
      </div>
    )
}