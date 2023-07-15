import { useParams, NavLink, Link } from "react-router-dom";
import "./BusinessMenu.css";

export default function BusinessMenu() {
  const { businessId } = useParams();

  return (
    <div className="business-menu flex-c">
      <Link
        className="logo"
        to="/"
      >
        Super
        <span className="logo-b">Treats</span>
      </Link>
      <NavLink
        exact
        to="/business"
        className="menu-link"
      >
        <i className="fa-solid fa-sitemap"></i>
        Business Home
      </NavLink>
      {businessId && (
        <>
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
        </>
      )}
    </div>
  );
}
