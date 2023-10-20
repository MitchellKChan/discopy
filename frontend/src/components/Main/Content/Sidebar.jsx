import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { showNewChannelModal } from '../../../store/modal';

import './Sidebar.css';

const Sidebar = () => {
    const dispatch = useDispatch()
    const { url } = useRouteMatch();
    const { serverId } = useParams();
    const currentUser = useSelector(state => state.entities.currentUser);
    const channels = useSelector(state => state.entities.channels ? state.entities.channels : null);
    const server = useSelector(state => state.entities.servers[serverId]);
    let serversChannels = [];
    if (channels) serversChannels = Object.values(channels).filter(channel => channel.serverId == serverId);

    const handleClick = (e) => {
        e.preventDefault();
        if (server.creatorId === currentUser.id) dispatch(showNewChannelModal(
            "newChannel",
            serverId
        ));
    }

    return (
        <div className="content-sidebar-item-wrapper">
            <div className="content-sidebar-item-header">
                <div className="sidebar-item-header-title">Text Channels</div>
                {server.creatorId === currentUser.id ?
                    <div
                        className="channel-add"
                        onClick={handleClick}
                    >+</div> : <></>
                }
            </div>
            {serversChannels.map(channel => {
                return (
                    <SidebarItem
                        key={channel.id}
                        to={`${url}/${channel.id}`}
                        channel={channel}
                    />
                );
            })}
        </div>
    );
}

export default Sidebar;