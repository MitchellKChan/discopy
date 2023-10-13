import csrfFetch, { storeCSRFToken } from './csrf';

// action constants
const SET_CURRENT_USER = 'entities/setCurrentUser';
const REMOVE_CURRENT_USER = 'entities/removeCurrentUser';

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
        body: JSON.stringify({demo: true})
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
const storeCurrentEntities = (user) => {
    if (user) sessionStorage.setItem("currentEntities", JSON.stringify(user));
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
            } else {
                newState["currentUser"] = action.user;
            }
            return newState;
        case REMOVE_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default entitiesReducer;