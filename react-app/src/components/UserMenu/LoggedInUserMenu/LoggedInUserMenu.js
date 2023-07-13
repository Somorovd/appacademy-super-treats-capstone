import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { logout } from "../../../store/session";

import "./LoggedInUserMenu.css";

export default function LoggedInUserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const modalNavigate = (path) => {
    closeModal();
    history.push(path);
  };

  const handleSignout = async () => {
    await dispatch(logout());
    modalNavigate("/");
  };

  return (
    <>
      <section>
        <button
          className="user-menu__signout"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </section>
      <section>
        <button onClick={() => modalNavigate("/business")}>
          Manage your businesses
        </button>
        <button onClick={() => modalNavigate("/business/create")}>
          Add your business
        </button>
      </section>
    </>
  );
}
