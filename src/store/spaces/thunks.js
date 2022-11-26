import {
  startLoading,
  appDoneLoading,
  fetchAllSpaces,
  fetchSpaceDetails,
  deleteSpace,
} from "./slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const allSpacesThunk = async (dispatch, getState) => {
  try {
    dispatch(startLoading());

    const allSpaces = await axios.get(`http://localhost:4000/spaces`);
    const response = allSpaces.data;

    dispatch(fetchAllSpaces(response));
  } catch (e) {
    console.log(e.message);
  }
};

export function spaceDetailsThunk(spaceId) {
  async function fetchDetails(dispatch, getState) {
    try {
      dispatch(startLoading());
      const spaceDetails = await axios.get(
        `http://localhost:4000/spaces/${spaceId}`
      );

      const response = spaceDetails.data;

      dispatch(fetchSpaceDetails(response));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  }
  return fetchDetails;
}

export function spaceDelete(spaceId) {
  return async function deleteRequest(dispatch, getState) {
    try {
      const spaceToDelete = await axios.delete(
        `http://localhost:4000/spaces/${spaceId}`
      );

      const response = spaceToDelete.data;

      // dispatch(deleteSpace(spaceId));

      console.log("from thunk - spaceId", spaceId);
    } catch (e) {
      console.log(e.message);
    }
  };
}
