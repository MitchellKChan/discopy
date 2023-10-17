import csrfFetch from "../store/csrf";

// server action constants
export const RECEIVE_SERVER = 'entities/receiveServer';
export const REMOVE_SERVER = 'entities/removeServer';

// server action creators
export const receiveServer = (server) => {
    return ({
        type: RECEIVE_SERVER,
        server
    });
}

export const removeServer = (serverId) => {
    return ({
        type: REMOVE_SERVER,
        serverId
    });
}

// server thunk action creators
export const createServer = (server) => async (dispatch) => {
    const res = await csrfFetch('/api/servers', {
        method: 'POST',
        body: JSON.stringify(server)
    });
    const payload = await res.json();
    dispatch(receiveServer(payload));
    return res;
}

export const updateServer = (server) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${server.id}`, {
        method: 'PATCH',
        body: JSON.stringify(server)
    });
    const payload = await res.json();
    dispatch(receiveServer(payload));
    return res;
}

export const deleteServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`, {
        method: 'DELETE'
    });
    const payload = await res.json();
    dispatch(removeServer(payload.serverId));
    return res;
}

export const leaveServer = (serverId, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/joined_servers/${serverId}`, {
        method: 'DELETE',
        body: {
            serverId,
            userId
        }
    });
    const payload = await res.json();
    dispatch(removeServer(payload.joinedServerId));
    return res;
}

// servers reducer for managing servers slice of state within entities
const serversReducer = (state = {}, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case RECEIVE_SERVER:
            newState[action.server.id] = action.server;
            return newState;
        case REMOVE_SERVER:
            delete newState[action.serverId];
            return newState;
        default:
            return state;
    }
}

export default serversReducer;