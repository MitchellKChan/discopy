import React from 'react';

import './ServerItem.css';

const ServerItem = ({ server }) => {
    return (
        <div className="server-item-container">
            <div className="server-item-wrapper">
                <div className="server-item">
                    <div className="server-initial">{server.name[0]}</div>
                </div>
            </div>
        </div>
    );
}

export default ServerItem;