import csrfFetch, { storeCSRFToken } from './csrf';

// action constants
const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

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

// session helper functions
const storeCurrentUser = (user) => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

// initial state constant for sessionReducer
const initialState = { 
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};


// session reducer for managing session slice of state
const sessionReducer = (state = initialState, action) => {
    const newState = Object.assign({}, Object.freeze(state));
    switch (action.type) {
        case SET_CURRENT_USER:
            newState['user'] = action.user;
            return newState;
        case REMOVE_CURRENT_USER:
            newState['user'] = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;