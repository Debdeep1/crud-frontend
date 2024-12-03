import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCustomer: [],
};

const billingsSlice = createSlice({
  name: "billings",
  initialState,
  reducers: {
    setFilterCustomers: (state, action) => {
      state.filteredCustomer = action.payload;
    },
  },
});

export const { setFilterCustomers } = billingsSlice.actions;
export default billingsSlice.reducer;
