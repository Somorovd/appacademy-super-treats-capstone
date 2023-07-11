import { useHistory } from "react-router-dom";
import "./PageHeader.css";
import { useSelector } from "react-redux";

export default function PageHeader() {
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  return (
    <header className="page-header flex flex-b1">
      <div className="header-left flex">
        <div className="header-menu">
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="header-logo">SuperTreats</div>
      </div>
      <div className="header-right flex">
        {!user && (
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
