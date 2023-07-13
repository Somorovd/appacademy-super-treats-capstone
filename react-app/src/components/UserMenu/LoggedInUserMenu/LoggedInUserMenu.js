import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
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
      <section className="menu-section">
        <button
          className="user-menu__signout"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </section>
      <section className="menu-section">
        <Link
          to="/business"
          className="user-menu__link"
          onClick={closeModal}
        >
          Manage your businesses
        </Link>
        <Link
          to="/business/create"
          className="user-menu__link"
          onClick={closeModal}
        >
          Add your business
        </Link>
      </section>
    </>
  );
}
