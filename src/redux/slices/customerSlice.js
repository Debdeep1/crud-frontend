import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  customer: {},
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { addCustomers, setCustomer } = customerSlice.actions;
export default customerSlice.reducer;
