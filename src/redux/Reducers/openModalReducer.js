import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  openModalPopup: false,
  ComponentTitle: "default",
  ComponentContent: "default",
};

const openModalReducer = createSlice({
  name: "openModalReducer",
  initialState,
  reducers: {
    modal(state, action) {
      state.openModal = action.payload;
    },
    modalPopUp(state, action) {
      const { ComponentContent, openModalPopup, ComponentTitle } = action.payload;
      state.openModalPopup = openModalPopup;
      state.ComponentContent = ComponentContent;
      state.ComponentTitle = ComponentTitle;
    },
  },
});

export const { modal, modalPopUp } = openModalReducer.actions;

export default openModalReducer.reducer;

