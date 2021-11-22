import React, { useState, useEffect } from "react";
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function Auth() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginView, setIsLoginView] = useState(true)

    const [token, setToken] = useCookies(['craftingnexus'])

    useEffect(() => {
        if (token['craftingnexus']) window.location.href = '/patterns'
    }, [token])

    const loginClicked = () => {
        API.loginUser({ username, password })
            .then(resp => setToken('craftingnexus', resp.token))
            .catch(error => console.log(error))
    }

    const registerClicked = () => {
        API.registerUser({ username, password })
            .then(() => loginClicked())
            .catch(error => console.log(error))
    }

    return (
        <div>
            {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            <label htmlFor="username">Username</label><br />
            <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={evt => setUserName(evt.target.value)} /><br />
            <label htmlFor="password">Password</label><br />
            <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={evt => setPassword(evt.target.value)} /><br />
            {isLoginView ?
                <button onClick={loginClicked}>Login</button> :
                <button onClick={registerClicked}>Register</button>
            }
            {isLoginView ?
                <p onClick={() => setIsLoginView(false)}>Don't have an account? Register Here!</p> :
                <p onClick={() => setIsLoginView(true)}>Have an account? Login Here!</p>
            }

        </div>
    )
}

export default Auth;