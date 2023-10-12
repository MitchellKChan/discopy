import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SplashPage.css';
import { logout } from '../../store/session';

const SplashPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    return (
        <>
            <div className="splash-top">
                <nav className="nav">
                    <div className="logo">Discopy</div>
                    <Link to="/login" className="login">
                        <div className="white-button small-button">
                            {currentUser ? "Open Discopy" : "Login"}
                        </div>
                    </Link>
                </nav>
                <div className="splash-top-message-container">
                    <div className="splash-top-headline">Imagine a place...</div>
                    <div className="splash-top-message">
                        ...where you can belong to a gaming group, a sports league,
                        or a worldwide pizza community. Where just you and a handful
                        of friends can spend time together. A place that makes it easy
                        to talk every day and hang out more often.
                    </div>
                    <div className="socials">
                        <a 
                            href="https://github.com/MitchellKChan/discopy"
                            target="blank"
                            rel="noopener noreferrer"
                        >
                            <div className="white-button large-button social">
                                <img 
                                    src={require("./images/github-mark.png")} 
                                    alt="" 
                                />
                                <div>Github</div>
                            </div>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/mitchellkchan/"
                            target="blank"
                            rel="noopener noreferrer"
                        >
                            <div className="black-button large-button social">
                                <img 
                                    src={require("./images/linkedin_logo.png")} 
                                    className="linkedin-logo"
                                    alt="" 
                                />
                                <div>LinkedIn</div>
                            </div>
                        </a>
                    </div>
                </div>
                <div aria-hidden="true" className="splash-top-bg">
                    <img 
                        src={require("./images/topSectionBg.svg").default}
                        className="bg-hills"
                        alt="" 
                    />
                    <img 
                        src={require("./images/topSectionLeft.svg").default}
                        className="bg-shoes"
                        alt="" 
                    />
                    <img 
                        src={require("./images/topSectionRight.svg").default}
                        className="bg-table"
                        alt="" 
                    />
                </div>
            </div>
            <div className="splash-middle">
                <div className="splash-middle-container">
                    <div className="middle-section">
                        <img 
                            src={require("./images/middleSection1.svg").default}
                            alt="middle-section-1" 
                        />
                        <div className="middle-section-content right">
                            <div className="middle-section-headline">
                                Create an invite-only place where you belong
                            </div>
                            <div className="middle-section-message">
                                Discopy servers are organized into topic-based channels 
                                where you can collaborate, share, and just talk about your 
                                day without clogging up a group chat.
                            </div>
                        </div>
                    </div>
                    <div className="middle-section off-white-section">
                        <div className="middle-section-content left">
                            <div className="middle-section-headline">
                                Where hanging out is easy
                            </div>
                            <div className="middle-section-message">
                                Grab a seat in a voice channel when you're free. Friends 
                                in your server can see you're around and instantly pop in 
                                to talk without having to call.
                            </div>
                        </div>
                        <img 
                            src={require("./images/middleSection2.svg").default}
                            alt="middle-section-2" 
                        />
                    </div>
                    <div className="middle-section">
                        <img 
                            src={require("./images/middleSection1.svg").default}
                            alt="middle-section-1" 
                        />
                        <div className="middle-section-content right">
                            <div className="middle-section-headline">
                                From few to a fandom
                            </div>
                            <div className="middle-section-message">
                                Get any community running with moderation tools and custom 
                                member access. Give members special powers, set up private 
                                channels, and more.
                            </div>
                        </div>
                    </div>
                    <div className="middle-section off-white-section bottom large">
                        <div className="middle-section-headline large">
                            Reliable tech for staying close
                        </div>
                        <div className="middle-section-message large">
                            Low-latency voice and video feels like you're in the same room. 
                            Wave hello over video, watch friends stream their games, or 
                            gather up and have a drawing session with screen share.
                        </div>
                        <img 
                            src={require("./images/middleSection4.svg").default}
                            alt="middle-section-4" 
                        />
                    </div>
                    <div className="middle-section off-white-section bottom last">
                        <div aria-hidden="true" className="start-journey-bg"><img 
                            src={require("./images/startJourneyBg.svg").default}
                            alt="start-journey-bg" 
                        /></div>
                        <div className="middle-section-headline last">
                            Ready to start your journey?
                        </div>
                        <Link to="/login" className="login">
                            <div className="blue-button large-button middle-section-button">
                                {currentUser ? "Open Discopy" : "Login"}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="splash-footer">
                <nav className="nav">
                    <div className="logo">Discopy</div>
                    <Link to="/register" className="login">
                        <div className="blue-button small-button">
                            {currentUser ? "Open Discopy" : "Sign Up"}
                        </div>
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default SplashPage;