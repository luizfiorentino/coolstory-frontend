import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allSpaces: [],
  spaceDetails: null,
};

export const spaceListSlice = createSlice({
  name: "spaceList",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    fetchAllSpaces: (state, action) => {
      state.allSpaces = [...action.payload];

      state.loading = false;
    },
    fetchSpaceDetails: (state, action) => {
      state.spaceDetails = action.payload;
    },
    addNewSpace: (state, action) => {
      state.allSpaces = [...state.allSpaces, action.payload.newUser];
    },
  },
});

export const { startLoading, fetchAllSpaces, fetchSpaceDetails, addNewSpace } =
  spaceListSlice.actions;
export default spaceListSlice.reducer;
