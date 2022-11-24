import { startLoading, fetchAllSpaces, fetchSpaceDetails } from "./slice";
import axios from "axios";

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
    } catch (e) {
      console.log(e.message);
    }
  }
  return fetchDetails;
}
