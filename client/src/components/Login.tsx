import { Link } from "react-router-dom"
import "./Account.css"
import { FormEvent, useRef, useState } from "react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        console.log(email);
        console.log(password);
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
                <input className="input-field" placeholder="*Password" required onChange={(e) => setPassword(e.target.value)}></input>
                <p id="password-text">Must be 6 characters and contain at least 1 number</p>
                <button className="submit-button" type="submit">LOG IN</button>
                <Link to="/lostpassword">Lost your password?</Link>
            </form>
        </div>

    )
}
