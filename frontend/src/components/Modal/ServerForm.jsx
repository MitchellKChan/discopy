import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../store/modal';
import { useState } from 'react';

// import '../../shared/LoginRegisterForm.css';
import './ServerForm.css';


const ServerForm = () => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.entities.currentUser.username);

    const [serverName, setServerName] = useState(`${username}'s server`);

    const handleChange = (name) => {
        setServerName(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <form className="form-fields" onSubmit={handleSubmit}>
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
            </div>
        </div>
    );
}

export default ServerForm;