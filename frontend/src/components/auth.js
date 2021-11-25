import React, { useState, useEffect } from "react";
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function Auth() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoginView, setIsLoginView] = useState(true)

    const [token, setToken] = useCookies(['craftingnexus'])

    useEffect(() => {
        if (token['craftingnexus']) window.location.href = '/patterns'
    }, [token])

    const loginClicked = () => {
        if (!handleValidation()) return
        API.loginUser({ username, password })
            .then(resp => setToken('craftingnexus', resp.token))
            .catch(error => console.log(error))

    }

    const registerClicked = () => {
        API.registerUser({ username, password })
            .then(() => loginClicked())
            .catch(error => console.log(error))
    }

    const handleValidation = (event) => {
        let formIsValid = true;

        if (username.length > 50) {
            formIsValid = false;
            setUserNameError("UserName is too long");
            return false
        } else {
            setUserNameError("");
            formIsValid = true
        }

        if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
            formIsValid = false;
            setPasswordError(
                "Only Letters/Numbers and length must best min 8 Characters and Max 22 Chracters"
            );
            return false;
        } else {
            setPasswordError("");
            formIsValid = true;
        }
        return formIsValid;
    }

    return (
        <div className="Auth">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">

                        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
                        <div className="form-group">
                            <label htmlFor="username">Username</label><br />
                            <input
                                id="userNameInput"
                                name="userNameInput"
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={evt => setUserName(evt.target.value)} /><br />
                            <small id="userNameHelp" className="text-danger form-text">
                                {userNameError}
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label><br />
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={evt => setPassword(evt.target.value)} /><br />
                            <small id="passworderror" className="text-danger form-text">
                                {passwordError}
                            </small>
                        </div>
                        {isLoginView ?
                            <button onClick={loginClicked}>Login</button> :
                            <button onClick={registerClicked}>Register</button>
                        }
                        {isLoginView ?
                            <p onClick={() => setIsLoginView(false)}>Don't have an account? Register Here!</p> :
                            <p onClick={() => setIsLoginView(true)}>Have an account? Login Here!</p>
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Auth;