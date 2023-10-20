import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showEditChannelModal } from '../../../store/modal';

import './SidebarItem.css';

const SidebarItem = ({ to, channel }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.entities.currentUser);
    const server = useSelector(state => state.entities.servers[channel.serverId]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(showEditChannelModal(
            "editChannel",
            channel
        ));
    }

    return (
        <NavLink
            key={channel.id}
            to={to}
            className="navlink"
        >
            <div className="sidebar-item-container">
                <div className="sidebar-item-name">#{channel.name}</div>
                {server.creatorId === currentUser.id ?
                    <div
                        className="sidebar-item-settings"
                        onClick={handleClick}
                    >
                        Edit Channel
                    </div> : <></>
                }
            </div>
        </NavLink>
    );
}

export default SidebarItem;