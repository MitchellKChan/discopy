import React from 'react';
import { hideModal } from '../../store/modal';
import { useDispatch, useSelector } from 'react-redux'

import './Modal.css';

const Modal = () => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    if (!modal) return null;

    let component;
    switch (modal) {
        case "server":
            component = <div>Hello there from Modal; triggered by ADD server</div>;
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
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
}

export default Modal;