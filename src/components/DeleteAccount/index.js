import React from "react";

export default function DeleteAccount(props) {
  return (
    <div>
      <h3>
        Attention! By clicking "Confirm" your account will be ended, and all My
        Space's information including stories will be deleted.
      </h3>

      <button>Confirm</button>

      <button onClick={props.deleteSpace}>Cancel</button>
    </div>
  );
}
