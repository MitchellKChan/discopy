import csrfFetch from "../store/csrf";

// server action constants
export const RECEIVE_JOINED_SERVER = 'entities/receiveJoinedServer';
export const REMOVE_JOINED_SERVER = 'entities/removeJoinedServer';

// server action creators
export const receiveJoinedServer = (joinedServer) => {
    return ({
        type: RECEIVE_JOINED_SERVER,
        joinedServer
    });
}

export const removeJoinedServer = (joinedServerId) => {
    return ({
        type: REMOVE_JOINED_SERVER,
        joinedServerId
    });
}

// server thunk action creators
export const joinServer = (joinedServer) => async (dispatch) => {
    const res = await csrfFetch('/api/joined_servers', {
        method: 'POST',
        body: JSON.stringify(joinedServer)
    });
    const payload = await res.json();
    dispatch(receiveJoinedServer(payload));
    return res;
}

export const leaveServer = (joinedServerId) => async (dispatch) => {
    const res = await csrfFetch(`/api/joined_servers/${joinedServerId}`, {
        method: 'DELETE'
    });
    const payload = await res.json();
    dispatch(removeJoinedServer(payload.joinedServerId));
    return res;
}

// joined servers reducer for managing slice of state within entities
const joinedServersReducer = (state = {}, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case RECEIVE_JOINED_SERVER:
            newState[action.joinedServer.id] = action.joinedServer;
            return newState;
        case REMOVE_JOINED_SERVER:
            delete newState[action.joinedServerId];
            return newState;
        default:
            return state;
    }
}

export default joinedServersReducer;