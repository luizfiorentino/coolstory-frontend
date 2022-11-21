import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/slice";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./styles.css";
export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user?.email}</Nav.Item>
      <Button>
        {""}
        <div>
          <Link to="/mySpace" className="my-space-link">
            My Space
          </Link>
        </div>
      </Button>
      <div className="logout-button">
        <Button onClick={() => dispatch(logOut())}>Logout</Button>
      </div>
    </>
  );
}
