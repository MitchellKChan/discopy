// action constants
export const SHOW_MODAL = 'modal/SHOW_MODAL';
export const SHOW_EDIT_SERVER_MODAL = 'modal/SHOW_EDIT_SERVER_MODAL';
export const HIDE_MODAL = 'modal/HIDE_MODAL';

// action creators
export const showModal = (modal) => {
    return ({
        type: SHOW_MODAL,
        modal
    });
}

export const showEditServerModal = (modal, server) => {
    return ({
        type: SHOW_EDIT_SERVER_MODAL,
        modal,
        server
    });
}

export const hideModal = () => {
    return ({
        type: HIDE_MODAL
    });
}

const modalReducer = (state = null, action) => {
    switch (action.type){
        case SHOW_MODAL:
            return action;
        case SHOW_EDIT_SERVER_MODAL:
            return action;
        case HIDE_MODAL:
            return null;
        default:
            return state;
    }
}

export default modalReducer;