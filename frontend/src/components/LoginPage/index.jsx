import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginDemo } from '../../store/session';
import { Link, Redirect } from 'react-router-dom';

import '../../shared/LoginRegisterForm.css';
import './LoginPage.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [loginInfo, setLoginInfo] = useState({
        credential: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    if (currentUser) return <Redirect to="/channels" />;

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

    const handleDemoUser = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(loginDemo())
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
            });
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
                            <label className="field-wrapper">
                                <div className={`field-header ${errors.length > 0 ? "invalid" : ""}`}>
                                    <div className="field-label">Email</div>
                                    {errors.length > 0 ?
                                        <span className="login-error"> - Login or password is invalid.</span> :
                                        <span className="required"> * </span>
                                    }
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => handleChange("credential", e.target.value)}
                                    value={loginInfo.credential}
                                    required
                                />
                            </label>
                            <label className="field-wrapper">
                                <div className={`field-header ${errors.length > 0 ? "invalid" : ""}`}>
                                    <div className="field-label">Password</div>
                                    {errors.length > 0 ?
                                        <span className="login-error"> - Login or password is invalid.</span> :
                                        <span className="required"> * </span>
                                    }
                                </div>
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
                            <div className="register-nav">
                                Need an account? <Link to="/register" className="form-link">Register</Link>
                            </div>
                            <div className="demo-nav form-link" onClick={handleDemoUser}>Log Into Demo</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;