import csrfFetch from "../store/csrf";
import { receiveChannels } from "./channelApiUtils";
import { receiveUsers } from "./userApiUtils";

// server action constants
export const RECEIVE_SERVERS = 'entities/receiveServers';
export const RECEIVE_SERVER = 'entities/receiveServer';
export const REMOVE_SERVER = 'entities/removeServer';

// server action creators
export const receiveServers = (servers) => {
    return ({
        type: RECEIVE_SERVERS,
        servers
    });
}

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
export const fetchServer = (serverId) => async (dispatch) => {
    const res = await csrfFetch(`/api/servers/${serverId}`);
    const payload = await res.json();
    // debugger;
    if (payload.channels) dispatch(receiveChannels(payload.channels));
    if (payload.members) dispatch(receiveUsers(payload.members));
    delete payload.channels;
    delete payload.members;
    dispatch(receiveServer(payload));
    return res;
}

export const createServer = (server) => async (dispatch) => {
    const res = await csrfFetch('/api/servers', {
        method: 'POST',
        body: JSON.stringify(server)
    });
    const payload = await res.json();
    dispatch(receiveServer(payload));
    dispatch(receiveChannels(payload.channels));
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

// servers helper functions
// export const receiveChannels = (dispatch, channels) => {
//     // Object.values(channels).forEach(channel => dispatch(receiveChannel(channel)));
// }

// export const receiveMembers = (dispatch, members) => {
//     // Object.values(members).forEach(member => dispatch(receiveUser(member)));
// }

// servers reducer for managing slice of state within entities
const serversReducer = (state = {}, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case RECEIVE_SERVERS:
            return { ...newState, ...action.servers };
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