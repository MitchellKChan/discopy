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
            className="navlink sidebar-item-link"
        >
            <div className="sidebar-item-container">
                <div className="sidebar-item">
                    <div className="sidebar-item-name">
                        <span className="hashtag">#</span>
                        {channel.name.length > 12 ? 
                            `${channel.name.substring(0,11)}...`  : 
                            channel.name
                        }
                    </div>
                    {server.creatorId === currentUser.id ?
                        <div
                            className="sidebar-item-settings"
                            onClick={handleClick}
                        >
                            edit
                        </div> : <></>
                    }
                </div>
            </div>
        </NavLink>
    );
}

export default SidebarItem;