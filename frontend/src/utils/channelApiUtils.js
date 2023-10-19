import csrfFetch from "../store/csrf";
import { receiveMessages } from "./messageApiUtils";

// channel action constants
export const RECEIVE_CHANNELS = 'entities/receiveChannels';
export const RECEIVE_CHANNEL = 'entities/receiveChannel';
export const REMOVE_CHANNEL = 'entities/removeChannel';

// channel action creators
export const receiveChannels = (channels) => {
    return ({
        type: RECEIVE_CHANNELS,
        channels
    });
}

export const receiveChannel = (channel) => {
    return ({
        type: RECEIVE_CHANNEL,
        channel
    });
}

export const removeChannel = (channelId) => {
    return ({
        type: REMOVE_CHANNEL,
        channelId
    });
}

// channel thunk action creators
export const fetchChannel = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channelId}`);
    const payload = await res.json();
    if (payload.messages) dispatch(receiveMessages(payload.messages));
    delete payload.messages;
    dispatch(receiveChannel(payload));
    return res;
}

export const createChannel = (channel) => async (dispatch) => {
    const res = await csrfFetch('/api/channels', {
        method: 'POST',
        body: JSON.stringify(channel)
    });
    const payload = await res.json();
    dispatch(receiveChannel(payload));
    if (payload.messages) receiveMessages(dispatch, payload.messages);
    return res;
}

export const updateChannel = (channel) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channel.id}`, {
        method: 'PATCH',
        body: JSON.stringify(channel)
    });
    const payload = await res.json();
    dispatch(receiveChannel(payload));
    return res;
}

export const deleteChannel = (channelId) => async (dispatch) => {
    const res = await csrfFetch(`/api/channels/${channelId}`, {
        method: 'DELETE'
    });
    const payload = await res.json();
    dispatch(removeChannel(payload.channelId));
    return res;
}

// channels reducer for managing slice of state within entities
const channelsReducer = (state = {}, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return { ...newState, ...action.channels };
        case RECEIVE_CHANNEL:
            newState[action.channel.id] = action.channel;
            return newState;
        case REMOVE_CHANNEL:
            delete newState[action.channelId];
            return newState;
        default:
            return state;
    }
}

export default channelsReducer;