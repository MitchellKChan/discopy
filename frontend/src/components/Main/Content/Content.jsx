import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';
import { showEditServerModal } from '../../../store/modal';
import { logout } from '../../../store/entities';
import Body from './Body';

const Content = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.entities.currentUser);
    const servers = useSelector(state => state.entities.servers);
    const joinedServers = useSelector(state => state.entities.joinedServers);
    const channels = useSelector(state => state.entities.channels);
    const { url } = useRouteMatch();
    const { serverId } = useParams();

    if (!serverId) return <Redirect to="/" />;

    const serversChannels = Object.values(channels).filter(channel => channel.serverId == serverId);

    let joinedServer;
    if (joinedServers) joinedServer = Object.values(joinedServers).find(joinedServer => {
        return joinedServer.serverId == serverId && joinedServer.memberId == currentUser.id;
    });

    return (
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
                                onClick={() => dispatch(showEditServerModal(
                                    "editServer",
                                    servers[serverId],
                                    joinedServer
                                ))}
                            >
                                <div>
                                    {`${servers[serverId].name}`}
                                </div>
                                <div>
                                    <img
                                        src={require("../images/angle-down.svg").default}
                                        className="angle-down"
                                        alt=""
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="content-sidebar-item-container">
                    {serverId === "@me" ?
                        <div>directMessages</div> :
                        <div>
                            {serversChannels.map(channel => {
                                return (

                                    <NavLink 
                                        key={channel.id} 
                                        to={`${url}/${channel.id}`}
                                        className="navlink"
                                    >
                                        <div>{channel.name}</div>
                                    </NavLink>
                                );
                            })}
                        </div>
                    }
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
            <Switch>
                <Route path={`${url}/:channelId`}>
                    <Body channels={serversChannels} />
                </Route>
                <Route path={`${url}`}>
                    <Body />
                </Route>
            </Switch>
        </div>
    );
}

export default Content;