import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zones: [],
  zone: {},
};

const zoneSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    addZones: (state, action) => {
      state.zones = action.payload;
    },
    setZone: (state, action) => {
      state.zone = action.payload;
    },
  },
});

export const { addZones, setZone } = zoneSlice.actions;
export default zoneSlice.reducer;
