import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './ServerIndex.css';
import ServerItem from './ServerItem';

const ServerIndex = () => {
    const servers = useSelector(state => state.entities.servers);
    const [usersServers, setUsersServers] = useState([]);

    useEffect(() => {
        console.log(servers);
        setUsersServers(servers);
    }, [servers])

    return (
        <div className="main-servers-container">
            <ServerItem symbol="DMs" />
            <div className="main-servers-child servers-separator-container">
                <div className="servers-separator"></div>
            </div>
            {Object.values(usersServers).map(server => {
                return (
                    <ServerItem key={server.id} server={server} />
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