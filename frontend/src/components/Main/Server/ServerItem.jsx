import React from 'react';

import './ServerItem.css';

const ServerItem = ({ server, symbol }) => {

    const containerClassNames = () => {
        const dmClass = symbol === "DMs" ? "dm" : "";
        return `main-servers-child server-item-container ${dmClass}`
    }

    const itemClassNames = () => {
        let itemClass = "";
        if (symbol) {
            symbol === "DMs" ? itemClass = "dm-item" : itemClass = "tool-item";
        }
        return `server-item unselected-item ${itemClass}`
    }

    const serverInitials = () => {
        const initials = server ? server.name[0] : symbol;
        return (
            <div className="server-initial">{initials}</div>
        );
    }

    const handleHover = (e) => {
        console.log("hovering");
    }
    
    return (
        <div 
            className={containerClassNames()} 
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <div className="server-item-wrapper">
                <div className={itemClassNames()}>
                    {serverInitials()}
                </div>
            </div>
        </div>
    );
}

export default ServerItem;