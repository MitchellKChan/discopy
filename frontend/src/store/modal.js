// action constants
export const SHOW_MODAL = 'modal/SHOW_MODAL';
export const HIDE_MODAL = 'modal/HIDE_MODAL';

// action creators
export const showModal = (modal) => {
    return ({
        type: SHOW_MODAL,
        modal
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
            return action.modal;
        case HIDE_MODAL:
            return null;
        default:
            return state;
    }
}

export default modalReducer;