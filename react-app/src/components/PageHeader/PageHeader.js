import { useHistory } from "react-router-dom";
import "./PageHeader.css";

export default function PageHeader() {
  const history = useHistory();
  return (
    <header className="page-header flex flex-b1">
      <div className="header-left flex">
        <div className="header-menu">
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="header-logo">SuperTreats</div>
      </div>
      <div className="header-right flex">
        <button
          className="header-login"
          onClick={() => history.push("/login")}
        >
          <i class="fa-solid fa-user"></i> Log in
        </button>
        <button
          className="header-signup bt-black"
          onClick={() => history.push("/signup")}
        >
          Sign up
        </button>
      </div>
    </header>
  );
}
