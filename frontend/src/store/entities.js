import csrfFetch, { storeCSRFToken } from './csrf';

// action constants
const SET_CURRENT_USER = 'entities/setCurrentUser';
const REMOVE_CURRENT_USER = 'entities/removeCurrentUser';

// action creators
export const setCurrentUser = (user) => {
    return ({
        type: SET_CURRENT_USER,
        currentUser: user.currentUser,
        servers: user.servers
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
    storeCurrentUser(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

export const loginDemo = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({demo: true})
    });
    const payload = await res.json();
    storeCurrentUser(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

export const register = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const payload = await res.json();
    storeCurrentUser(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res;
}

export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const payload = await res.json();
    storeCurrentUser(payload);
    dispatch(setCurrentUser(payload));
    return res;
}

// entities helper functions
const storeCurrentUser = (user) => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

// initial state constant for entitiesReducer
const initialState = { 
    currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
};


// entities reducer for managing entities slice of state
const entitiesReducer = (state = initialState, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case SET_CURRENT_USER:
            newState["currentUser"] = action.currentUser;
            newState["servers"] = action.servers;
            return newState;
        case REMOVE_CURRENT_USER:
            // newState["currentUser"] = null;
            return {};
        default:
            return state;
    }
}

export default entitiesReducer;