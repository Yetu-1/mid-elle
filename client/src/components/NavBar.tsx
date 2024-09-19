import "../App.css"
import { MyNavLink } from "./MyNavLink"
import { AvatarButton } from './AvatarButton'
import { UserAccountButton } from './UserAccountButton'
import cartIcon from "../assets/icon-cart.svg"
import { Link } from "react-router-dom"

export function NavBar() {
    return (
      <div className='nav-bar'>
        <div className='nav-1'>
          <Link to="/" id="logo">MID-ELLE</Link>
          <MyNavLink />     
        </div>
  
        <div className='nav-list'>
          <div className="profile-button">
            <img src="/search.svg" alt="profile image" style={{width: "35px"}}/>
          </div>
          {(sessionStorage.getItem("token"))? <AvatarButton /> : <UserAccountButton />}
          <div id="cart-button">
          {(sessionStorage.getItem("cartCount") == null)? "" :
            <div id="cart-item-count">
              <p>{sessionStorage.getItem("cartCount")}</p>
            </div>
          }
            <img src={cartIcon}  alt="cart icon" style={{width: "25px"}}/>
          </div>
        </div>
      </div>
    )
}