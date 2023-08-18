import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { logout } from "../../../store/session";

import PersonalLinksSection from "../PersonalLinksSection";
import "./LoggedInUserMenu.css";

export default function LoggedInUserMenu() {
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
    sessionStorage.clear();
    modalNavigate("/");
  };

  const comingSoon = () => {
    alert("Feature Coming Soon");
  };

  return (
    <>
      <section className="menu-section">
        <div className="menu-profile">
          <i className="fa-solid fa-circle-user menu-profile__icon"></i>
          <p className="menu-profile__name">{`${user.firstName} ${user.lastName}`}</p>
          <Link
            to=""
            className="user-menu__link"
            onClick={comingSoon}
          >
            Manage Profile *
          </Link>
        </div>
        <Link
          to=""
          className="user-menu__link"
          onClick={comingSoon}
        >
          <i className="fa-solid fa-truck-fast"></i>
          Orders *
        </Link>
        <Link
          to=""
          className="user-menu__link"
          onClick={comingSoon}
        >
          <i className="fa-solid fa-heart"></i>
          Favorites *
        </Link>

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
          className="user-menu__link active"
          onClick={closeModal}
        >
          Manage your businesses
        </Link>
        <Link
          to="/business/create"
          className="user-menu__link active"
          onClick={closeModal}
        >
          Add your business
        </Link>
      </section>
      <PersonalLinksSection />
      <footer>* Coming Soon</footer>
    </>
  );
}
