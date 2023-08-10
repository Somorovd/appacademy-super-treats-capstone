import { NavLink, useParams } from "react-router-dom";
import "./MenuPageNavBar.css";

export default function MenuPageNavBar() {
  const { businessId } = useParams();

  return (
    <nav
      id="menu-nav"
      className="flex flex-11 g10"
    >
      <NavLink to={`/business/${businessId}/menu/items`}>Items</NavLink>
      <NavLink to={`/business/${businessId}/menu/categories`}>
        Categories
      </NavLink>
    </nav>
  );
}
