import { useSelector } from "react-redux";
import LoggedInUserMenu from "./LoggedInUserMenu";
import LoggedOutUserMenu from "./LoggedOutUserMenu";

import "./UserMenu.css";

export default function UserMenu() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="user-menu flex-c">
      {user ? <LoggedInUserMenu /> : <LoggedOutUserMenu />}
    </div>
  );
}
