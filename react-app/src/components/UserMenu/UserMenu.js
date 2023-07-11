import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

import "./UserMenu.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignOut = async () => {
    await dispatch(logout());
    history.push("/");
  };

  return (
    <div className="user-menu">
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
