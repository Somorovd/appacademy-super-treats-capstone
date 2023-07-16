import { useParams, NavLink } from "react-router-dom";
import Logo from "../../utils/Logo";
import "./BusinessMenu.css";

export default function BusinessMenu() {
  const { businessId } = useParams();

  return (
    <div className="business-menu flex-c">
      <section>
        <Logo />
        <NavLink
          exact
          to="/business"
          className="menu-link"
        >
          <i className="fa-solid fa-table"></i>
          Your Businesses
        </NavLink>
      </section>

      {businessId && (
        <section>
          <NavLink
            exact
            to={`/business/${businessId}`}
            className="menu-link"
          >
            <i className="fa-solid fa-house"></i>
            Overview
          </NavLink>
          <NavLink
            to={`/business/${businessId}/items`}
            className="menu-link"
          >
            <i className="fa-solid fa-utensils"></i>
            Menu
          </NavLink>
        </section>
      )}
    </div>
  );
}
