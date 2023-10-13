import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './ServerIndex.css';
import ServerItem from './ServerItem';

const ServerIndex = () => {
    const dispatch = useDispatch();
    const servers = useSelector(state => state.entities.servers);

    useEffect(() => {
    }, [servers]);

    return (
        <div className="main-servers-container">
            {/* <ServerItem /> */}
            {Object.values(servers).map(server => {
                return (
                    <ServerItem key={server.id} server={server} />
                );
            })}
        </div>
    );
}

export default ServerIndex;