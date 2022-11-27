import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser, selectUserSpace } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/actions";
import { loginSuccess, logOut, tokenStillValid } from "./slice";
import { addNewSpace } from "../spaces/slice";
import { createNextState } from "@reduxjs/toolkit";
import { postNewStory, deleteStory, updateProfile } from "./slice";
import { accountDeleted } from "./slice";
import { deleteThisSpace } from "../spaces/slice";

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.user,
          userSpace: { ...response.data.newSpace, stories: [] },
        })
      );

      dispatch(addNewSpace({ newUser: response.data.newUser }));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.user,
          userSpace: response.data.userSpace,
        })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(
        tokenStillValid({ user: response.data, userSpace: response.data.space })
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const postStory = (name, content, imageUrl, spaceId) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;
    dispatch(appLoading());
    try {
      const newStory = await axios.post(
        `${apiUrl}/stories`,
        {
          name,
          content,
          imageUrl,
          spaceId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(postNewStory(newStory));
      dispatch(appDoneLoading());
    } catch (e) {
      dispatch(appDoneLoading());
      return e.message;
    }
  };
};

export const deleteThisStory = (storyId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const deleteRequest = await axios.delete(`${apiUrl}/stories/${storyId}`);
      dispatch(deleteStory(storyId));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e);
      dispatch(appDoneLoading());
    }
  };
};

// export const deleteStoriesFromSpace = async (spaceId) => {
//   return async (dispatch, getState) => {
//     dispatch(appLoading());
//     const deletedStories = await axios.delete(`/storiesBySpaceId/${spaceId}`);
//     console.log("stories deleted");
//     dispatch(appDoneLoading());
//   };
// };

export const updateSpace = (title, description, backgroundColor, color) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;
    const space = selectUserSpace(getState());

    const id = space.id;

    if (!id) return;

    dispatch(appLoading());
    try {
      const editedProfile = await axios.put(
        `${apiUrl}/spaces/${id}`,
        {
          title,
          description,
          backgroundColor,
          color,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updateProfile(editedProfile.data));
      dispatch(appDoneLoading());
      console.log("edited prof actions", editedProfile.data);
    } catch (e) {
      console.log(e);
      dispatch(appDoneLoading());
    }
  };
};

export const deleteAccount = (userId, spaceId) => {
  return async (dispatch, getState) => {
    const deletedAccount = await axios.delete(`${apiUrl}/auth/${userId}`);
    const deletedStories = await axios.delete(
      `${apiUrl}/storiesBySpaceId/${spaceId}`
    );
    const spaceToDelete = await axios.delete(`${apiUrl}/spaces/${spaceId}`);

    const response = [
      spaceToDelete.data,
      deletedStories.data,
      deletedAccount.data,
    ];
    console.log("from thunk userId and spaceId", userId, spaceId);

    dispatch(deleteThisSpace(spaceId));
    dispatch(accountDeleted());
    console.log("thunks account deleted");
  };
};
