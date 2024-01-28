import { useState } from "react"
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setLoginInUser }) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState();


    const validateDriver = async (password) => {
        try {
            const response = await fetch(`http://localhost:8080/drivers/${password}`);
            const jsonData = await response.json();

            if (jsonData.initials === username) {
                setLoginInUser(password);
                jsonData.isManager ? navigate("/manager") : navigate("/home");
            } else {
                throw new Error("Invalid");
            }
        } catch (error) {
            throw new Error("Invalid");
        }
    }

    const updateUserName = (event) => {
        setUsername(event.target.value);
    }

    const updateUserPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleFormSubmit = (event) => {

        event.preventDefault();

        if (!username || !password) {
            alert("Need to provide all details")
            return;
        } else {
            validateDriver(password).catch((error) => {
                alert("Invalid details");
            });
        }
        setUsername("");
        setPassword("");
    }

    return (

        <section className="login-form">

            <form className="login" onSubmit={(event) => handleFormSubmit(event)}>
                <div className="username-login">
                    <label htmlFor="name-input"></label>
                    <input
                        type="text"
                        id="name-input"
                        onInput={(event) => updateUserName(event)}
                        value={username}
                        placeholder="Username"
                        className="name-input"

                    />
                </div>
                <div className="username-login">
                    <label htmlFor="password-input"></label>
                    <input
                        type="password"
                        id="password-input"
                        onInput={(event) => updateUserPassword(event)}
                        value={password}
                        placeholder="Password"
                        className="name-input"
                    />
                </div>
                <input className="btn-default" type="submit" value={"Log in"} />
            </form>

        </section>
    );




}

export default LoginForm;