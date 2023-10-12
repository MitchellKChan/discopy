import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Redirect } from "react-router-dom";
import { logout } from "../../store/entities";

import "./Main.css";

const Main = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.currentUser);
    const match = useRouteMatch();

    if (!currentUser) return <Redirect to="/" />;

    return (
        <>
            <div className="main-container">
                <div className="main-servers-container">
                    ServersIndex Placeholder
                </div>
                <div className="main-content-container">
                    <div className="content-sidebar-container">
                        DirectMessageThreadIndex / ChannelIndex Sidebar Placeholder
                        <div className="user-container">
                            <div className="username">{currentUser.username}</div>
                            <div 
                                className="logout"
                                onClick={() => dispatch(logout())}
                            >
                                Log Out
                            </div>
                        </div>
                    </div>
                    <div className="content-body-container">
                        <div className="body-header-container">
                            LinkIndex / DirectMessageIndex / ChannelMessageIndex Navheader Placeholder
                        </div>
                        <div className="body-content-container">
                            <div className="body-content-items-container">
                                LinkItem / DirectMessageItem / ChannelMessageItem Container Placeholder
                            </div>
                            <div className="body-content-sidebar-container">
                                ActiveNowIndex / UserProfile / MemberListIndex Container Placeholder
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;