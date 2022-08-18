const initialState = {
    modalType: null,
    modalProps: {},
    isModalOn: false
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            // if(window) window.history.pushState({ isModalOn: true }, '')

            return {
                ...state,
                modalState: {
                    modalType: action.modalType,
                    modalProps: action.modalProps,
                    isModalOn:true,
                }
            }
        case 'HIDE_MODAL':
            return { modalState: initialState }
        default:
            return state
    }
}
