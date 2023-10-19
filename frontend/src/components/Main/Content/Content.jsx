import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';
import { showEditServerModal } from '../../../store/modal';
import { logout } from '../../../store/entities';
import Body from './Body';
import { fetchServer } from '../../../utils/serverApiUtils';
import Sidebar from './Sidebar';

const Content = () => {
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const { serverId } = useParams();

    const currentUser = useSelector(state => state.entities.currentUser);
    const servers = useSelector(state => state.entities.servers);
    const joinedServers = useSelector(state => state.entities.joinedServers);
    const channels = useSelector(state => state.entities.channels ? state.entities.channels : null);

    const server = servers ? servers[serverId] : null;

    const isValidServerId = (serverId) => servers && Object.keys(servers).includes(serverId);

    useEffect(() => {
        if (isValidServerId(serverId)) dispatch(fetchServer(serverId));
    }, [serverId]);

    if (serverId !== "@me" && !isValidServerId(serverId)) return <Redirect to="/channels/@me" />;

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
                                    server,
                                    joinedServer
                                ))}
                            >
                                <div>
                                    {`${server.name}`}
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
                        <div>Direct Messages</div> :
                        <Sidebar />
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
                    <Body serverId={serverId} type="Channel" />
                </Route>
                {/* route to enable rendering for 'channels/@me' */}
                <Route path={`${url}`}>
                    <Body />
                </Route>
            </Switch>
        </div>
    );
}

export default Content;