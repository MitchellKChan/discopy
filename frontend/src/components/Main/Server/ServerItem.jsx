import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../store/modal';

import './ServerItem.css';

const ServerItem = ({ server, symbol }) => {
    const dispatch = useDispatch();

    const containerClassNames = () => {
        return `main-servers-child server-item-container`;
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

    const handleClick = (e) => {
        if (symbol) {
            switch (symbol) {
                case "ADD":
                    dispatch(showModal("newServer"));
                    break;
                case "EXP":
                    dispatch(showModal("joinServer"));
                    break;
                default:
                    break;
            }
        } 
    }
    
    return (
        <div 
            className={containerClassNames()} 
            onClick={handleClick}
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