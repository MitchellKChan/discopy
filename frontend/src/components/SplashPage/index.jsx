import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SplashPage.css';
// import './images/middleSection1.svg';

const SplashPage = () => {
    const user = useSelector(state => state.session.user);
    return (
        <>
            <div className="splash-top">
                <nav className="nav">
                    <div className="logo">Discopy</div>
                    <Link to="/login" className="login">
                        <div className="white-button small-button">
                            {user ? "Open Discord" : "Login"}
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
                            target='blank'
                            rel='noopener noreferrer'
                        >
                            <div className="white-button large-button github">
                                Github
                            </div>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/mitchellkchan/"
                            target='blank'
                            rel='noopener noreferrer'
                        >
                            <div className="black-button large-button linkedin">
                                LinkedIn
                            </div>
                        </a>
                    </div>
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
                                Discord servers are organized into topic-based channels 
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
                    <div className="middle-section large off-white-section">
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
                </div>
            </div>
        </>
    );
}

export default SplashPage;