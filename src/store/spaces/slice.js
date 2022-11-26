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
    appDoneLoading: (state) => {
      state.loading = false;
    },

    fetchAllSpaces: (state, action) => {
      state.allSpaces = [...action.payload];

      state.loading = false;
    },
    fetchSpaceDetails: (state, action) => {
      state.spaceDetails = action.payload;
      console.log("space details", action.payload);
    },
    addNewSpace: (state, action) => {
      state.allSpaces = [...state.allSpaces, action.payload.newUser];
    },
    deleteThisSpace: (state, action) => {
      state.allSpaces = [...state.allSpaces].filter(
        (space) => space.id !== action.payload
      );

      console.log("from slice spaceId:", action.payload);
    },
  },
});

export const {
  startLoading,
  appDoneLoading,
  fetchAllSpaces,
  fetchSpaceDetails,
  addNewSpace,
  deleteThisSpace,
} = spaceListSlice.actions;
export default spaceListSlice.reducer;
