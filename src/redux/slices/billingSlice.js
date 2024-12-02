import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  billings: [],
};

const billingsSlice = createSlice({
  name: "billings",
  initialState,
  reducers: {
    addBilling: (state, action) => {
      state.billings.push(action.payload);
    },
  },
});

export const { addBilling } = billingsSlice.actions;
export default billingsSlice.reducer;
