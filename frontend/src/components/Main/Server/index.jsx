import React from 'react';
import { useSelector } from 'react-redux';
import ServerItem from './ServerItem';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

import './ServerIndex.css';

const ServerIndex = () => {
    const { url } = useRouteMatch();
    const servers = useSelector(state => state.entities.servers);

    return (
        <div className="main-servers-container">
            <NavLink to={`@me`} className="navlink">
                <ServerItem symbol="DMs" />
            </NavLink>
            <div className="main-servers-child servers-separator-container">
                <div className="servers-separator"></div>
            </div>
            {Object.values(servers).map(server => {
                return (
                    <NavLink key={server.id} to={`${server.id}`} className="navlink">
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