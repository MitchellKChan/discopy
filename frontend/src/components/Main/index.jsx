import React, { Children } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/entities';
import { useParams } from 'react-router-dom';
import { showEditServerModal } from '../../store/modal';

import "./Main.css";
import ServerIndex from './Server';

const Main = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.entities.currentUser);
    const servers = useSelector(state => state.entities.servers);
    const { serverId } = useParams();

    if (!currentUser || !serverId ) return <Redirect to="/" />;

    return (
        <>
            <div className="main-container">
                <ServerIndex />
                <div className="main-content-container">
                    <div className="content-sidebar-container">
                        <div className="content-sidebar-header-container">
                            <div className="content-sidebar-header">
                                {serverId === "@me" ?
                                    <div className="content-sidebar-header-dm">
                                        Find or start a conversation
                                    </div> :
                                    <div 
                                        className="content-sidebar-header-server"
                                        onClick={() => dispatch(showEditServerModal("editServer", servers[serverId]))}
                                    >
                                        <div>
                                            {`${servers[serverId].name}`}
                                        </div>
                                        <div>
                                            <img
                                                src={require("./images/angle-down.svg").default}
                                                className="angle-down"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="content-sidebar-item-container">
                            DirectMessageThreadIndex / ChannelIndex Sidebar Placeholder
                        </div>
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
            {Children.map(child => {
                return (
                    <>
                        ${child}
                    </>
                );
            })}
        </>
    );
}

export default Main;