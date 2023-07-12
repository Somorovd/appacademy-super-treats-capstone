import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { logout } from "../../../store/session";

import "./LoggedInUserMenu.css";

export default function LoggedInUserMenu() {
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
      <section>
        <button
          className="user-menu__signout"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </section>
      <section>
        <button onClick={history.push("/business/create")}>
          Add your restaurant
        </button>
      </section>
    </>
  );
}
