import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plans: [],
  plan: {},
};

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlans: (state, action) => {
      state.plans = action.payload;
    },
    setPlan: (state, action) => {
      state.plan = action.payload;
    },
  },
});

export const { addPlans, setPlan } = planSlice.actions;
export default planSlice.reducer;
