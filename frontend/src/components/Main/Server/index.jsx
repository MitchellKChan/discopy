import React from 'react';
import { useSelector } from 'react-redux';

import './ServerIndex.css';
import ServerItem from './ServerItem';

const ServerIndex = () => {
    const servers = useSelector(state => state.entities.servers);

    return (
        <div className="main-servers-container">
            <ServerItem symbol="DMs" />
            <div className="main-servers-child servers-separator-container">
                <div className="servers-separator"></div>
            </div>
            {Object.values(servers).map(server => {
                return (
                    <ServerItem key={server.id} server={server} />
                );
            })}
            <div className="main-servers-child servers-separator-container">
                <div className="servers-separator"></div>
            </div>
            <ServerItem symbol="ADD" />
            <ServerItem symbol="EXP" />
            <ServerItem symbol="DL" />
        </div>
    );
}

export default ServerIndex;