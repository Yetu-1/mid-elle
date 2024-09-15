import { NavLink } from "react-router-dom";
import "./MyNavLink.css"
const links = [
    {
        name: "TRENDING",
        path: "/"
    },
    {
        name: "RINGS",
        path: "/rings"
    },
    {
        name: "NECKLACES",
        path: "/women"
    },
    {
        name: "BRACELETS",
        path: "/about"
    },
    {
        name: "EARRINGS",
        path: "/contact"
    },
    {
        name: "GIFT BOXES",
        path: "/contact"
    }
]
  

  
export function MyNavLink() {
    return (
      <div className='nav-list'>
        {links.map((link, index) => {
          return (
            <NavLink to={link.path} className={({isActive}) => isActive? "active" : ""} 
            key={`${link.name}-${index}`}>
              {link.name}
            </NavLink>
          )
        })}
      </div>
    );
  }