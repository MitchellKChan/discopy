import React from 'react';
import { NavLink } from 'react-router-dom';

import './SidebarItem.css';

const SidebarItem = ({ to, channel, className }) => {
    return (
        <NavLink
            key={channel.id}
            to={to}
            className={className}
        >
            <div className="sidebar-item-container">
                <div>#{channel.name}</div>
                <div>options div</div>
            </div>
        </NavLink>
    );
}

export default SidebarItem;