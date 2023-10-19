import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/modal";
import { useHistory } from "react-router-dom";
import { joinServer } from "../../utils/joinedServerApiUtils";

import './ExploreServersIndex.css';
import { fetchServer } from "../../utils/serverApiUtils";

const ExploreServersIndex = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.entities.currentUser);
    let servers = useSelector(state => state.entities.servers);
    if (!servers) servers = {};
    const history = useHistory();
    let joinableServers = useSelector(state => state.entities.joinableServers);
    if (!joinableServers) joinableServers = {};

    const handleClick = (e, serverId) => {
        e.preventDefault();
        const joinedServer = {
            serverId,
            memberId: currentUser.id
        }
        dispatch(joinServer(joinedServer));
        dispatch(fetchServer(serverId));
        dispatch(hideModal());
        history.push("/channels/@me");
    }

    return (
        <div className="server-form-container explore-servers-container">
            <div className="server-form-wrapper">
                <div className="server-form-header">
                    <div className="form-header-title">
                        Find your community on Discopy
                    </div>
                    <div className="form-header-message explore-servers-message">
                        From gaming, to music, to learning,
                        there's a place for you.
                    </div>
                    <button
                        className="form-header-close"
                        onClick={() => dispatch(hideModal())}
                    >
                        x
                    </button>
                </div>
                <div className="explore-servers-items-container">
                    {Object.values(joinableServers).map(server => {
                        if (!Object.keys(servers).includes(String(server.id))) {
                            return (
                                <button
                                    onClick={(e) => handleClick(e, server.id)}
                                    key={server.id}
                                >
                                    {server.name}
                                </button>
                            );
                        } else {
                            return (
                                <></>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default ExploreServersIndex;