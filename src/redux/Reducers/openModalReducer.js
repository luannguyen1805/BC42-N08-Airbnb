import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  openModalPopup: false,
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
      const { ComponentContent, openModalPopup } = action.payload;
      state.openModalPopup = openModalPopup;
      state.ComponentContent = ComponentContent;
    },
  },
});

export const { modal, modalPopUp } = openModalReducer.actions;

export default openModalReducer.reducer;


