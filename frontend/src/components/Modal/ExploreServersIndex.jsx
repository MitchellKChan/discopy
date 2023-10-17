import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/modal";
import { useHistory } from "react-router-dom";
import { joinServer } from "../../utils/joinedServerApiUtil";

import './ExploreServersIndex.css';
import { receiveServer } from "../../utils/serverApiUtils";

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
        dispatch(receiveServer(joinableServers[serverId]));
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
                        console.log('server', server);
                        console.log(Object.values(servers));
                        return (
                            <button
                                onClick={(e) => handleClick(e, server.id)}
                                key={server.id}
                                disabled={Object.keys(servers).includes(server.id.to_s)}
                            >
                                {server.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ExploreServersIndex;