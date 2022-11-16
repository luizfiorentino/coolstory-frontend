import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  userSpace: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userSpace", action.payload.userSpace);
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.userSpace = action.payload.userSpace;
      console.log(" sliceFROM userSpace:::", action.payload);
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
      state.userSpace = action.payload.userSpace;
    },
    postNewStory: (state, action) => {
      const newStory = action.payload.data;
      state.userSpace.stories = [...state.userSpace.stories, newStory];

      console.log("slice new story", action.payload.data);
    },
    deleteStory: (state, action) => {
      state.userSpace.stories = [...state.userSpace.stories].filter(
        (story) => story.id !== action.payload
      );
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  deleteStory,
  postNewStory,
} = userSlice.actions;

export default userSlice.reducer;
