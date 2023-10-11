import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/session';
import { Link, Redirect } from 'react-router-dom';

import '../../shared/LoginRegisterForm.css';
import './RegisterPage.css';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [registrationInfo, setRegistrationInfo] = useState({
        email: "",
        displayName: "",
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const invalidField = (field) => {
        const fieldErrors = errors.filter(err => err.includes(field));
        return fieldErrors.length > 0;
    }

    const handleChange = (field, value) => {
        setRegistrationInfo({
            ...registrationInfo,
            [field]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(register(registrationInfo))
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
                <div className="form-card register-card">
                    <div className="form-container">
                        <div className="form-header">
                            <div className="header-text">Create an account</div>
                        </div>
                        <form className="form-fields" onSubmit={handleSubmit}>
                            <label className="field-wrapper">
                                <div className={`field-header ${invalidField("Email") ? "invalid" : ""}`}>
                                    <div className="field-label">Email</div>
                                    {invalidField("Email") ?
                                        <span className="login-error"> - Not a well formated email address</span> :
                                        <span className="required"> * </span>
                                    }
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    value={registrationInfo.email}
                                    required
                                />
                            </label>
                            <label className="field-wrapper">
                                <div className={`field-header`}>
                                    <div className="field-label">Display Name</div>
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => handleChange("displayName", e.target.value)}
                                    value={registrationInfo.displayName}
                                />
                            </label>
                            <label className="field-wrapper">
                                <div className={`field-header ${invalidField("Username") ? "invalid" : ""}`}>
                                    <div className="field-label">Username</div>
                                    {invalidField("Username") ?
                                        <span className="login-error"> - Must be between 2 and 32 in length</span> :
                                        <span className="required"> * </span>
                                    }
                                </div>
                                <input
                                    type="text"
                                    onChange={(e) => handleChange("username", e.target.value)}
                                    value={registrationInfo.username}
                                    required
                                />
                            </label>
                            <label className="field-wrapper">
                                <div className={`field-header ${invalidField("Password") ? "invalid" : ""}`}>
                                    <div className="field-label">Password</div>
                                    {invalidField("Password") ?
                                        <span className="login-error"> - Must be at least 8 characters long</span> :
                                        <span className="required"> * </span>
                                    }
                                </div>
                                <input
                                    type="password"
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    value={registrationInfo.password}
                                    required
                                />
                            </label>
                            <input className="form-button" type="submit" value="Register" />
                        </form>
                        <div className="form-nav-to">
                            <Link to="/login" className="form-link">Already have an account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;