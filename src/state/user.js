import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const inicialState = false;

const reducer = createReducer(inicialState, {
  [setUser]: (state, action) => {
    return action.payload;
  },
});

export default reducer;
