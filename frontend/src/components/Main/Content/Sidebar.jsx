import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const { url } = useRouteMatch();
    const { serverId } = useParams();
    const channels = useSelector(state => state.entities.channels ? state.entities.channels : null);
    let serversChannels = [];
    if (channels) serversChannels = Object.values(channels).filter(channel => channel.serverId == serverId);
    return (
        <div>
            <div>Text Channels</div>
            {serversChannels.map(channel => {
                return (
                    <SidebarItem
                        key={channel.id}
                        to={`${url}/${channel.id}`}
                        channel={channel}
                        className="navlink"
                    />
                    // <NavLink
                    //     key={channel.id}
                    //     to={`${url}/${channel.id}`}
                    //     className="navlink"
                    // >
                    //     <div>#{channel.name}</div>
                    // </NavLink>
                );
            })}
        </div>
    );
}

export default Sidebar;