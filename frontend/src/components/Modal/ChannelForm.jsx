import { useDispatch } from "react-redux";
import { hideModal } from '../../store/modal';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createChannel, deleteChannel, updateChannel } from "../../utils/channelApiUtils";

const ChannelForm = ({ type, channel = {}, serverId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [channelName, setChannelName] = useState(
        type === "new" ?
            "new-channel" :
            `${channel.name}`
    );

    const handleChange = (name) => {
        // const dashedName = 
        setChannelName(name.replace(" ", "-"));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "new") {
            const newChannel = {
                name: channelName,
                serverId
            };
            dispatch(createChannel(newChannel));
        } else {
            const updatedChannel = {
                ...channel,
                name: channelName
            }
            dispatch(updateChannel(updatedChannel));
            history.push(`/channels/${channel.serverId}/${channel.id}`);
        }
        dispatch(hideModal());
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteChannel(channel.id))
        dispatch(hideModal());
        history.push(`/channels/${channel.serverId}`);
    }

    return (
        <div className="server-form-container">
            <div className="server-form-wrapper">
                <div className="server-form-header">
                    <div className="form-header-title">
                        {type === "new" ?
                            "Create a channel" :
                            "Edit channel"
                        }
                    </div>
                    <div className="form-header-message">
                        Your channel is where you and your
                        friends communicate.
                        {type === "new" ?
                            "  Make yours and start chatting." :
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
                <form id="newServerForm" className="form-fields" onSubmit={handleSubmit}>
                    <label className="field-wrapper">
                        <div className="field-header">
                            <div className="field-label form-light-message">Channel Name</div>
                        </div>
                        <input
                            className="server-field-input"
                            type="text"
                            onChange={(e) => handleChange(e.target.value)}
                            value={channelName}
                            required
                        />
                    </label>
                </form>
            </div>
            <div className="server-form-footer">
                {type === "new" ?
                    <div></div> :
                    <button
                        className="form-button leave-or-delete-server"
                        onClick={(e) => handleDelete(e)}
                    >
                        <div className="server-form-button-label">
                            Delete Channel
                        </div>
                    </button>
                }
                <button
                    className="form-button"
                    type="submit"
                    form="newServerForm"
                    disabled={channelName.length < 1}
                >
                    <div className="server-form-button-label">
                        {type === "new" ?
                            "Create" : "Update"
                        }
                    </div>
                </button>
            </div>
        </div>
    );
}

export default ChannelForm;