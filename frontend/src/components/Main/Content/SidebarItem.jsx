import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './SidebarItem.css';
import { showModal } from '../../../store/modal';

const SidebarItem = ({ to, channel, className }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(showModal("other"));
    }

    return (
        <NavLink
            key={channel.id}
            to={to}
            className={className}
        >
            <div className="sidebar-item-container">
                <div className="sidebar-item-name">#{channel.name}</div>
                <div
                    className="sidebar-item-settings"
                    onClick={handleClick}
                >
                    Settings
                </div>
            </div>
        </NavLink>
    );
}

export default SidebarItem;