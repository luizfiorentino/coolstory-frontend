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
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
      state.userSpace = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
      state.userSpace = action.payload.userSpace;
    },
    postNewStory: (state, action) => {
      const newStory = action.payload.data;
      state.userSpace.stories = [...state.userSpace.stories, newStory];
    },
    deleteStory: (state, action) => {
      state.userSpace.stories = [...state.userSpace.stories].filter(
        (story) => story.id !== action.payload
      );
    },
    updateProfile: (state, action) => {
      const { title, description, backgroundColor, color } = action.payload;
      state.userSpace = {
        ...state.userSpace,
        title: title,
        description: description,
        backgroundColor: backgroundColor,
        color: color,
      };
    },
    accountDeleted: (state, action) => {
      state.userSpace = null;
      state.token = null;
      state.profile = null;
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  deleteStory,
  postNewStory,
  updateProfile,
  accountDeleted,
} = userSlice.actions;

export default userSlice.reducer;
