import { startLoading, fetchAllSpaces, fetchSpaceDetails } from "./slice";
import axios from "axios";

export const allSpacesThunk = async (dispatch, getState) => {
  try {
    dispatch(startLoading());

    const allSpaces = await axios.get(`http://localhost:4000/spaces`);

    console.log("space list thunk", allSpaces);
    const response = allSpaces.data;
    console.log("space thunk response", response);

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

      console.log("space list thunk", spaceDetails);
      const response = spaceDetails.data;
      console.log("space thunk response", response);

      dispatch(fetchSpaceDetails(response));
    } catch (e) {
      console.log(e.message);
    }
  }
  return fetchDetails;
}
