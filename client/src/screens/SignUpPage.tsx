import { Link, useNavigate  } from "react-router-dom"
import "./Account.css"
import axios from 'axios';
import { FormEvent, useState } from "react";
 
export function SignUpPage() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            // send a post request to the server with a payload that includes firstname, lastname, email and password
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/register`, {firstname: firstname, lastname: lastname, email: email, password: password});
            console.log(response.data);
            
            if(response.data == 'OK' || response.data == "Email exists") {
                navigate("/login");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="form-container">
            <div id="header">
                <h1>Create an Account</h1>
                <p>Create an account with us for a faster checkout, easy order tracking, saving your favorite products, and so much more.</p>
                <Link to="/login">Already have an account? Sign in</Link>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <input className="input-field" placeholder="*Firstname" required onChange={(e) => setFirstName(e.target.value)}></input>
                <input className="input-field" placeholder="*Lastname" required onChange={(e) => setLastName(e.target.value)}></input>
                <input className="input-field" placeholder="*Email" type="email" required onChange={(e) => setEmail(e.target.value)}></input>
                <input className="input-field" placeholder="*Password" required onChange={(e) => setPassword(e.target.value)}></input>
                <p id="password-text">Must be 6 characters and contain at least 1 number</p>
                <button className="submit-button" type="submit">CREATE ACCOUNT</button>
            </form>
        </div>

    )
}
