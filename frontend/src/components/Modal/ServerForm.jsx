import { useDispatch } from 'react-redux';

import './ServerForm.css';
import { hideModal } from '../../store/modal';
import { useState } from 'react';

const ServerForm = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: `<logged in users>'s server`
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="server-form-container">
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
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Server Name
                        <input type="text" />
                    </label>
                </form>
            </div>
        </div>
    );
}

export default ServerForm;