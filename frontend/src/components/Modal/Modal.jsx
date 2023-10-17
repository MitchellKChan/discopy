import React from 'react';
import { hideModal } from '../../store/modal';
import { useDispatch, useSelector } from 'react-redux'
import ServerForm from './ServerForm';

import './Modal.css';
import ExploreServersIndex from './ExploreServersIndex';

const Modal = () => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    if (!modal) return null;

    let component;
    switch (modal.modal) {
        case "newServer":
            component = <ServerForm type="new" />;
            break;
        case "editServer":
            component = <ServerForm
                type="edit"
                server={modal.server}
                joinedServer={modal.joinedServer}
            />;
            break;
        case "joinServer":
            component = <ExploreServersIndex />
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
                {component}
            </div>
        </div>
    );
}

export default Modal;