import { useNavigate } from "react-router-dom";
import "../App.css"

export function AvatarButton() {
    const navigate = useNavigate();
    function handleLogout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("cartCount");
      navigate("/")
      window.location.reload();
  }
  
    return (
      <div className="profile-button">
        <div className='top-element'>
          <div id="avatar">
            <img src="/icon-avatar.svg" alt="avater image" style={{width: "40px", borderRadius: "20px"}}/>
          </div>
        </div>
  
        <div className="dropdown dropdown-account">
          <p>Welcome back, <span style={{fontWeight: "bold"}}>{sessionStorage.getItem("firstname")}</span></p>
          <p className="dropdown-button" style={{textAlign: "center", paddingLeft: '0px'}} onClick={handleLogout}>SIGN OUT</p>
          <p style={{paddingTop: "10px", paddingBottom: "1px"}} onClick={() => {navigate('/orders')}}>Orders</p>
          <p style={{paddingTop: "10px", paddingBottom: "1px"}} onClick={() => {navigate('/addproduct')}}>Add Products</p>
        </div>
      </div>
    )
}