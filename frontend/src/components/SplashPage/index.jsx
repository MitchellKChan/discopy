import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import './SplashPage.css'

const SplashPage = () => {
    const user = useSelector(state => state.session.user);
    return (
        <>
            <div className="splash-top">
                <nav className="nav">
                    <div className="logo">Discopy</div>
                    <Link to="/login" className="login">
                        <div className="white-button small-button">{user ? "Open Discord" : "Login"}</div>
                    </Link>
                </nav>
                <div className="splash-message">
                    <div className="headline">Imagine a place...</div>
                    <div className="message">
                        ...where you can belong to a gaming group, a sports league,
                        or a worldwide pizza community. Where just you and a handful
                        of friends can spend time together. A place that makes it easy
                        to talk every day and hang out more often.
                    </div>
                    <div className="socials">
                        <a href="https://github.com/MitchellKChan/discopy">
                            <div className="white-button large-button github">
                                Github
                            </div>
                        </a>
                        <a href="https://www.linkedin.com/in/mitchellkchan/">
                            <div className="black-button large-button linkedin">
                                LinkedIn
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SplashPage;