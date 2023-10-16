import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../store/modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './ServerForm.css';
import { createServer } from '../../utils/serverApiUtils';


const ServerForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.entities.currentUser);

    const [serverName, setServerName] = useState(`${user.username}'s server`);

    const handleChange = (name) => {
        setServerName(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const server = {
            name: serverName,
            creatorId: user.id,
            public: true
        };
        dispatch(createServer(server));
        dispatch(hideModal());
    }

    return (
        <div className="server-form-container">
            <div className="server-form-wrapper">
                <div className="server-form-header">
                    <div className="form-header-title">Create a server</div>
                    <div className="form-header-message">
                        Your server is where you and your
                        friends hang out.  Make yours and
                        start talking.
                    </div>
                    <button
                        className="form-header-close"
                        onClick={() => dispatch(hideModal())}
                    >
                        x
                    </button>
                </div>
                <form id="newServerForm" className="form-fields" onSubmit={handleSubmit}>
                    <label className="field-wrapper">
                        <div className="field-header">
                            <div className="field-label form-light-message">Server Name</div>
                        </div>
                        <input
                            className="server-field-input"
                            type="text"
                            onChange={(e) => handleChange(e.target.value)}
                            value={serverName}
                            required
                        />
                    </label>
                </form>
                <div className="form-tos server-tos">
                    By creating a server, you agree to Discopy's
                    <Link to="#" className="form-link">Community Guidelines</Link>
                </div>
            </div>
            <div className="server-form-footer">
                <button 
                    className="form-button" 
                    type="submit" 
                    form="newServerForm"
                    disabled={serverName.length < 1}
                >
                    <div className="server-form-button-label">Create</div>
                </button>
            </div>
        </div>
    );
}

export default ServerForm;