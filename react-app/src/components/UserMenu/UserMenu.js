import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useModal } from "../../context/Modal";

import "./UserMenu.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const modalNavigate = (path) => {
    closeModal();
    history.push(path);
  };

  const handleSignout = async () => {
    await dispatch(logout());
    modalNavigate("/");
  };

  return (
    <div className="user-menu flex-c">
      {user && (
        <button
          className="user-menu__signout"
          onClick={handleSignout}
        >
          Sign out
        </button>
      )}
      {!user && (
        <>
          <button
            className="user-menu__login bt-black"
            onClick={() => modalNavigate("/signup")}
          >
            Sign up
          </button>
          <button
            className="user-menu__login"
            onClick={() => modalNavigate("/login")}
          >
            Log in
          </button>
        </>
      )}
    </div>
  );
}
