import { Link } from "react-router-dom"
import "./Account.css"
import { FormEvent, useRef, useState } from "react";

export function SignUp() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        console.log(email);
        console.log(firstname);
        console.log(lastname);
        console.log(password);
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
