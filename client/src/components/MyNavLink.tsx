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
        path: "/necklaces"
    },
    {
        name: "BRACELETS",
        path: "/bracelets"
    },
    {
        name: "EARRINGS",
        path: "/earrings"
    },
    {
        name: "GIFT BOXES",
        path: "/giftboxes"
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