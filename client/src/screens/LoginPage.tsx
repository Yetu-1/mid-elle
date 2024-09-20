import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { FormEvent, useState } from "react";
import "./Account.css"

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ispwCorrect, setIsPWCorrect] = useState(true);
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            // send a post request to the server with a payload that includes firstname, lastname, email and password
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {email: email, password: password});
            console.log(response.data);
            
            if(response.data.token) {
                sessionStorage.setItem("firstname", response.data.firstname);
                sessionStorage.setItem("token", response.data.jwt);
                sessionStorage.setItem("cartCount", "9");
                navigate("/");
            }else if (response.data == "Incorrect password") { // incorrect password
                setIsPWCorrect(false);
            }else if (response.data == "User not found") { // user not found
                navigate("/signup")
            }else {
                navigate("/login");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="form-container" style={{marginTop: "150px"}}>
            <div id="header">
                <h1>Welcome Back</h1>
                <p>Sign into your existing account to see your wishlist, check out faster, track existing orders and more.</p>
                <Link to="/signup">Don't have an account yet? Create one!</Link>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <input className="input-field" placeholder="*Email" type="email" required onChange={(e) => setEmail(e.target.value)}></input>
                <input className={(ispwCorrect)? " input-field" : "input-field border-red "} type="password" placeholder="*Password" required onChange={(e) => setPassword(e.target.value)}></input>
                <p id="password-text">Must be 6 characters and contain at least 1 number</p>
                <button className="submit-button" type="submit">LOG IN</button>
                <Link to="/lostpassword">Lost your password?</Link>
            </form>
        </div>

    )
}
