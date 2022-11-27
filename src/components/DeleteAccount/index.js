import React from "react";
import { spaceDelete } from "../../store/spaces/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { spaceDetails } from "../../store/spaces/selectors";
import { spaceDetailsThunk } from "../../store/spaces/thunks";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../store/user/actions";
import { deleteThisSpace } from "../../store/spaces/slice";
import { deleteStoriesFromSpace } from "../../store/user/actions";

export default function DeleteAccount(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector(spaceDetails);
  const spaceId = details.id;
  const userId = details.userId;
  console.log("spaceIDDD", spaceId);

  const deleteSpace = (id) => {
    if (!spaceId || !userId) {
      console.log("id not found");
      return;
    }
    dispatch(deleteAccount(userId, spaceId));
    // dispatch(deleteStoriesFromSpace(spaceId));
    // dispatch(spaceDelete(spaceId));
    // dispatch(deleteThisSpace(spaceId));

    console.log("delete page idUser", userId);
    navigate("/");
    console.log("succeeded", spaceId);
  };

  useEffect(() => {
    dispatch(spaceDetailsThunk(spaceId));
  }, [dispatch]);

  return (
    <div>
      <h3>
        Attention! By clicking "Confirm" your account will be ended, and all My
        Space's information including stories will be deleted.
      </h3>

      <button onClick={() => deleteSpace(spaceId)}>Confirm</button>

      <button onClick={props.deleteSpace}>Cancel</button>
    </div>
  );
}
