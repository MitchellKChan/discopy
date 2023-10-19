import csrfFetch from "../store/csrf";

// user action constants
export const RECEIVE_USERS = 'entities/receiveUsers';
export const RECEIVE_USER = 'entities/receiveUser';
export const REMOVE_USER = 'entities/removeUser';

// user action creators
export const receiveUsers = (users) => {
    return ({
        type: RECEIVE_USERS,
        users
    });
}

export const receiveUser = (user) => {
    return ({
        type: RECEIVE_USER,
        user
    });
}

export const removeUser = (userId) => {
    return ({
        type: REMOVE_USER,
        userId
    });
}

// members selector
// export const getMembers = (serverId) => (state) => {
//     if (serverId === "@me") return {};
//     const memberIds = Object.keys(state.entities.servers[serverId].memberIds);
//     return Object.values(state.entities.users).filter(user => memberIds.includes(user.id));
// }

// user thunk action creators
export const fetchUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const payload = await res.json();
    dispatch(receiveUser(payload));
    return res;
}

export const updateUser = (user) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user)
    });
    const payload = await res.json();
    dispatch(receiveUser(payload));
    return res;
}

// users reducer for managing slice of state within entities
const usersReducer = (state = {}, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case RECEIVE_USERS:
            return { ...newState, ...action.users };
        case RECEIVE_USER:
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
}

export default usersReducer;