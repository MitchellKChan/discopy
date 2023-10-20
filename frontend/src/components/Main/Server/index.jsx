import React from 'react';
import { useSelector } from 'react-redux';
import ServerItem from './ServerItem';
import { NavLink } from 'react-router-dom';

import './ServerIndex.css';

const ServerIndex = () => {
    let servers = useSelector(state => state.entities.servers ? state.entities.servers : {});
    let channels = useSelector(state => state.entities.channels ? state.entities.channels : {});

    if (!servers) servers = {};

    return (
        <div className="main-servers-container">
            <NavLink to={`/channels/@me`} className="navlink">
                <ServerItem symbol="DMs" />
            </NavLink>
            <div className="main-servers-child servers-separator-container">
                <div className="servers-separator"></div>
            </div>
            {Object.values(servers).map(server => {
                const general = Object.values(channels).find(channel => {
                    return channel.serverId == server.id
                });
                let link;
                if (!general) {
                    link = `/channels/${server.id}`;
                } else {
                    link = `/channels/${server.id}/${general.id}`;
                }

                return (
                    <NavLink key={server.id} to={link} className="navlink server-index-item">
                        <ServerItem server={server} />
                    </NavLink>
                );
            })}
            <ServerItem symbol="ADD" />
            <ServerItem symbol="EXP" />
            <div className="main-servers-child servers-separator-container">
                <div className="servers-separator"></div>
            </div>
            <ServerItem symbol="DL" />
        </div>
    );
}

export default ServerIndex;