import csrfFetch from "../store/csrf";

// message action constants
export const RECEIVE_MESSAGES = 'entities/receiveMessages';
export const RECEIVE_MESSAGE = 'entities/receiveMessage';
export const REMOVE_MESSAGE = 'entities/removeMessage';

// message action creators
export const receiveMessages = (messages) => {
    return ({
        type: RECEIVE_MESSAGES,
        messages
    });
}

export const receiveMessage = (message) => {
    return ({
        type: RECEIVE_MESSAGE,
        message
    });
}

export const removeMessage = (messageId) => {
    return ({
        type: REMOVE_MESSAGE,
        messageId
    });
}

// message thunk action creators
export const fetchMessage = (messageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${messageId}`);
    const payload = await res.json();
    dispatch(receiveMessage(payload));
    return res;
}

export const createMessage = (message) => async (dispatch) => {
    const res = await csrfFetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(message)
    });
    const payload = await res.json();
    dispatch(receiveMessage(payload));
    return res;
}

export const updateMessage = (message) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${message.id}`, {
        method: 'PATCH',
        body: JSON.stringify(message)
    });
    const payload = await res.json();
    dispatch(receiveMessage(payload));
    return res;
}

export const deleteMessage = (messageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    });
    const payload = await res.json();
    dispatch(removeMessage(payload.messageId));
    return res;
}

// messages reducer for managing slice of state within entities
const messagesReducer = (state = {}, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return { ...newState, ...action.messages };
        case RECEIVE_MESSAGE:
            newState[action.message.id] = action.message;
            return newState;
        case REMOVE_MESSAGE:
            delete newState[action.messageId];
            return newState;
        default:
            return state;
    }
}

export default messagesReducer;