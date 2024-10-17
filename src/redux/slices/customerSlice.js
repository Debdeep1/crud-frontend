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
      const newCustomers = action.payload;
      newCustomers.forEach((newCustomer) => {
        const customerExists = state.customers.some(
          (customer) => customer.id === newCustomer.id
        );

        if (!customerExists) {
          state.customers.push(newCustomer);
        }
      });
    },
  },
});

export const { addCustomers } = customerSlice.actions;
export default customerSlice.reducer;
