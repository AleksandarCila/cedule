const initialState = {
    modalType: null,
    modalProps: {}
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            console.log(state)
            return {
                ...state,
                modalState: {
                    modalType: action.modalType,
                    modalProps: action.modalProps
                }
            }
        case 'HIDE_MODAL':
            return {modalState:initialState}
        default:
            return state
    }
}
