import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import MenuPageNavBar from "../MenuPageNavBar";
import "./CategoryManagementPage.css";

export default function CategoryManagementPage() {
  const { businessId } = useParams();

  const categoriesObj = useSelector(
    (state) => state.userBusinesses.singleBusiness.categories
  );
  const categories = Object.values(categoriesObj);

  return (
    <div className="category-management-page">
      <header>
        <MenuPageNavBar />
        <div
          id="category-management-header"
          className="flex flex-b1"
        >
          <h2>Menu Categories</h2>
          <div className="flex">
            <Link
              to={`/business/${businessId}/menu/items/new`}
              className="bt-black bt-pd"
            >
              <i className="fa-solid fa-plus"></i> Add Category
            </Link>
          </div>
        </div>
      </header>
      <div>
        {categories.map((c) => (
          <p>{c.name}</p>
        ))}
      </div>
    </div>
  );
}
