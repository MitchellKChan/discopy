import React from "react";
import { useRouteMatch } from "react-router-dom";

import "./Main.css";

const Main = () => {
    const match = useRouteMatch();
    return (
        <>
            <div className="main-container">
                <div className="main-servers-container">
                    ServersIndex Placeholder
                </div>
                <div className="main-content-container">
                    <div className="content-sidebar-container">
                        DirectMessageThreadIndex / ChannelIndex Sidebar Placeholder
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