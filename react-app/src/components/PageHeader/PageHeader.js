import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import Logo from "../utils/Logo";
import UserMenu from "../UserMenu";
import "./PageHeader.css";

export default function PageHeader({
  backgroundColor,
  color,
  highlight,
  auth,
}) {
  const history = useHistory();
  const { setModalContent, setModalClass } = useModal();

  const user = useSelector((state) => state.session.user);

  const openUserMenu = () => {
    setModalClass("");
    setModalContent(<UserMenu />);
  };

  return (
    <header
      className="page-header flex flex-b1 pg-pd"
      style={{ backgroundColor, color }}
    >
      <div className="header-left flex">
        <div
          className="header-menu"
          onClick={openUserMenu}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
        <Logo
          color={color}
          highlight={highlight || color}
        />
      </div>
      <div className="header-right flex">
        {!user && auth && (
          <>
            <button
              className="header-login"
              onClick={() => history.push("/login")}
            >
              <i className="fa-solid fa-user"></i> Log in
            </button>
            <button
              className="header-signup bt-black"
              onClick={() => history.push("/signup")}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
