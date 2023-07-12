import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { logout } from "../../../store/session";

import "./LoggedInUserMenu.css";

export default function LoggedInUserMenu({ modalNavigate }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleSignout = async () => {
    await dispatch(logout());
    closeModal();
    history.push("/");
  };

  return (
    <>
      <button
        className="user-menu__signout"
        onClick={handleSignout}
      >
        Sign out
      </button>
    </>
  );
}
