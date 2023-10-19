import serversReducer, * as ServerApiUtil from '../utils/serverApiUtils';
import joinedServersReducer, * as JoinedServerApiUtil from '../utils/joinedServerApiUtils';
import channelsReducer, * as ChannelApiUtil from '../utils/channelApiUtils';
import messagesReducer, * as MessageApiUtil from '../utils/messageApiUtils';
import usersReducer, * as UserApiUtil from '../utils/userApiUtils';
import csrfFetch, { storeCSRFToken } from './csrf';

// action constants
export const SET_CURRENT_USER = 'entities/setCurrentUser';
export const REMOVE_CURRENT_USER = 'entities/removeCurrentUser';

// action creators
export const setCurrentUser = (user) => {
    return ({
        type: SET_CURRENT_USER,
        user
    });
}

export const removeCurrentUser = () => {
    return ({
        type: REMOVE_CURRENT_USER,
    });
}

// thunk action creators
export const login = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const payload = await res.json();
    storeCurrentEntities(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

export const loginDemo = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ demo: true })
    });
    const payload = await res.json();
    storeCurrentEntities(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

export const register = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const payload = await res.json();
    storeCurrentEntities(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentEntities(null);
    dispatch(removeCurrentUser());
    return res;
}

export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const payload = await res.json();
    storeCurrentEntities(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

// entities helper functions
const storeCurrentEntities = (entities) => {
    if (entities) sessionStorage.setItem("currentEntities", JSON.stringify(entities));
    else sessionStorage.removeItem("currentEntities");
}

// initial state constant for entitiesReducer
const initialState = JSON.parse(sessionStorage.getItem("currentEntities"));

// entities reducer for managing entities slice of state
const entitiesReducer = (state = initialState, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case SET_CURRENT_USER:
            if (action.user) {
                newState["currentUser"] = action.user.currentUser;
                newState["servers"] = action.user.servers;
                newState["joinedServers"] = action.user.joinedServers;
                newState["joinableServers"] = action.user.joinableServers;
                newState["channels"] = action.user.channels;
                newState["messages"] = {};
                newState["users"] = {};
            }
            return newState;
        case REMOVE_CURRENT_USER:
            return {};
        case ServerApiUtil.RECEIVE_SERVER:
            newState["servers"] = serversReducer(newState["servers"], action);
            storeCurrentEntities(newState);
            return newState;
        case ServerApiUtil.REMOVE_SERVER:
            newState["servers"] = serversReducer(newState["servers"], action);
            storeCurrentEntities(newState);
            return newState;
        case JoinedServerApiUtil.RECEIVE_JOINED_SERVER:
            newState["joinedServers"] = joinedServersReducer(newState["joinedServers"], action);
            storeCurrentEntities(newState);
            return newState;
        case JoinedServerApiUtil.REMOVE_JOINED_SERVER:
            newState["joinedServers"] = joinedServersReducer(newState["joinedServers"], action);
            storeCurrentEntities(newState);
            return newState;
        case ChannelApiUtil.RECEIVE_CHANNELS:
            newState["channels"] = channelsReducer(newState["channels"], action);
            storeCurrentEntities(newState);
            return newState;
        case ChannelApiUtil.RECEIVE_CHANNEL:
            newState["channels"] = channelsReducer(newState["channels"], action);
            storeCurrentEntities(newState);
            return newState;
        case ChannelApiUtil.REMOVE_CHANNEL:
            newState["channels"] = channelsReducer(newState["channels"], action);
            storeCurrentEntities(newState);
            return newState;
        case MessageApiUtil.RECEIVE_MESSAGES:
            newState["messages"] = messagesReducer(newState["messages"], action);
            storeCurrentEntities(newState);
            return newState;
        case MessageApiUtil.RECEIVE_MESSAGE:
            newState["messages"] = messagesReducer(newState["messages"], action);
            storeCurrentEntities(newState);
            return newState;
        case MessageApiUtil.REMOVE_MESSAGE:
            newState["messages"] = messagesReducer(newState["messages"], action);
            storeCurrentEntities(newState);
            return newState;
        case UserApiUtil.RECEIVE_USERS:
            newState["users"] = usersReducer(newState["users"], action);
            storeCurrentEntities(newState);
            return newState;
        case UserApiUtil.RECEIVE_USER:
            newState["users"] = usersReducer(newState["users"], action);
            storeCurrentEntities(newState);
            return newState;
        case UserApiUtil.REMOVE_USER:
            newState["users"] = usersReducer(newState["users"], action);
            storeCurrentEntities(newState);
            return newState;
        default:
            return state;
    }
}

export default entitiesReducer;