import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { Link, Redirect } from 'react-router-dom';

import '../../shared/LoginRegisterForm.css';
import './LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [loginInfo, setLoginInfo] = useState({
        credential: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleChange = (field, value) => {
        setLoginInfo({
            ...loginInfo, 
            [field]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login(loginInfo))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }
        );
    }

    return (
        <>
            <div className="form-page">
                <div className="form-card login-card">
                    <div className="form-container">
                        <div className="form-header">
                            <div className="header-text">Welcome back!</div>
                            <div>We're so excited to see you again!</div>
                        </div>
                        <form className="form-fields" onSubmit={handleSubmit}>
                            <ul>
                                {errors.map(err => <li key={err}>{err}</li>)}
                            </ul>
                            <label className="form-label">
                                Email
                                <span className="required">*</span>
                                <br />
                                <input
                                    type="text"
                                    onChange={(e) => handleChange("credential", e.target.value)}
                                    value={loginInfo.credential}
                                    required
                                />
                            </label>
                            <label className="form-label">
                                Password
                                <span className="required">*</span>
                                <br />
                                <input
                                    type="password"
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    value={loginInfo.password}
                                    required
                                />
                            </label>
                            <input className="form-button" type="submit" value="Log In" />
                        </form>
                        <div className="form-nav-to">
                            Need an account? <Link to="/register" className="form-link">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;