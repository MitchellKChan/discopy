import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../store/modal';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createServer, deleteServer, removeServer, updateServer } from '../../utils/serverApiUtils';
import { leaveServer } from '../../utils/joinedServerApiUtils';

import './ServerForm.css';

const ServerForm = ({ type, server = {}, joinedServer = {} }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.entities.currentUser);
    const history = useHistory();

    const [serverName, setServerName] = useState(
        type === "new" ? 
            `${user.username}'s server` :
            `${server.name}`
    );

    const handleChange = (name) => {
        setServerName(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "new") {
            const newServer = {
                name: serverName.trim(),
                creatorId: user.id
            };
            dispatch(createServer(newServer));
        } else {
            const updatedServer = {
                ...server,
                name: serverName.trim()
            }
            dispatch(updateServer(updatedServer));
        }
        dispatch(hideModal());
    }

    const handleLeaveOrDelete = (e) => {
        e.preventDefault();
        if (server.creatorId === user.id) {
            dispatch(deleteServer(server.id));
        } else {
            dispatch(leaveServer(joinedServer.id));
            dispatch(removeServer(server.id));
        }
        dispatch(hideModal());
        history.push('/channels/@me');
    }

    return (
        <div className="server-form-container">
            <div className="server-form-wrapper">
                <div className="server-form-header">
                    <div className="form-header-title">
                        {type === "new" ?
                            "Create a server" :
                            "Edit server"
                        }
                    </div>
                    <div className="form-header-message">
                        Your server is where you and your
                        friends hang out.
                        {type === "new" ?
                            "  Make yours and start talking." :
                            "  Edit yours how you like."
                        }
                    </div>
                    <button
                        className="form-header-close"
                        onClick={() => dispatch(hideModal())}
                    >
                        x
                    </button>
                </div>
                {type === "new" || server.creatorId === user.id ?
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
                    </form> : <></>
                }
                {type === "new" ?
                    <div className="form-tos server-tos">
                        By creating a server, you agree to Discopy's
                        <Link to="#" className="form-link">Community Guidelines</Link>
                    </div> :
                    <></>
                }
            </div>
            <div className="server-form-footer">
                {type === "new" ?
                    <div></div> :
                    <button
                        className="form-button leave-or-delete-server"
                        onClick={(e) => handleLeaveOrDelete(e)}
                    >
                        <div className="server-form-button-label">
                            {server.creatorId === user.id ?
                                "Delete Server" : "Leave Server"
                            }
                        </div>
                    </button>
                }
                {type === "new" || server.creatorId === user.id ?
                    <button
                        className="form-button"
                        type="submit"
                        form="newServerForm"
                        disabled={serverName.length < 1 || serverName.trim().length < 1}
                    >
                        <div className="server-form-button-label">
                            {type === "new" ?
                                "Create" : "Update"
                            }
                        </div>
                    </button> : <></>
                }
            </div>
        </div>
    );
}

export default ServerForm;