import csrfFetch from './csrf';

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
    const { credential, password } = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const payload = await res.json();
    dispatch(setCurrentUser(payload.user));
    return res;
}


// session reducer for managing session slice of state
const sessionReducer = (state = { user: null }, action) => {
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