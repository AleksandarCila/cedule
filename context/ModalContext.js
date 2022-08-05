import React, { createContext, useContext, useReducer } from "react";
import { modalReducer } from "./ModalReducer";

const ModalContext = createContext();

const initialState = {
    modalType: null,
    modalProps: {}
  }

const ModalStateContext = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, {
    modalState: initialState,
  });
  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalStateContext;

export const ModalState = () => {
  return useContext(ModalContext);
};
