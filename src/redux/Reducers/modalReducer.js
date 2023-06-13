import { createSlice } from "@reduxjs/toolkit";

const ComponentDefault = (props) => {
  return <div>default Value</div>;
};

const initialState = {
  title: "title",
  Component: ComponentDefault,
};

const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    setModalAction(state, action) {
      const { Component, title } = action.payload;
      state.Component = Component;
      state.title = title;
    },
  },
});

export const { setModalAction } = modalReducer.actions;

export default modalReducer.reducer;
