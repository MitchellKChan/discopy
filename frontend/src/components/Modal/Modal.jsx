import React from 'react';
import { hideModal } from '../../store/modal';
import { useDispatch, useSelector } from 'react-redux'
import ServerForm from './ServerForm';

import './Modal.css';

const Modal = () => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    if (!modal) return null;

    let component;
    switch (modal) {
        case "newServer":
            component = <ServerForm type="new" />;
            break;
        case "editServer":
            component = <ServerForm type="edit" />;
            break;
        case "other":
            break;
        default:
            return null;
    }

    const handleClick = (e) => {
        dispatch(hideModal());
    }

    return (
        <div className="modal-background" onClick={handleClick}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
}

export default Modal;