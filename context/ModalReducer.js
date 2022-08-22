const initialState = {
  modalType: null,
  modalProps: {},
  depth: 0,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      // if(window) window.history.pushState({ isModalOn: true }, '')
      const currentDepth = state.modalState.depth + 1;
      console.log(currentDepth);

      if (action.modalType === "DEPTH") {
        
        return {
          ...state,
          modalState: {
            ...state.modalState,
            depth: currentDepth,
          },
        };
      }

      return {
        ...state,
        modalState: {
          modalType: action.modalType,
          modalProps: action.modalProps,
          depth: currentDepth,
        },
      };
    case "HIDE_MODAL":
      currentDepth = state.modalState.depth - 1;
      console.log(currentDepth);

      return { modalState: { ...initialState, depth: currentDepth } };
    default:
      return state;
  }
};
