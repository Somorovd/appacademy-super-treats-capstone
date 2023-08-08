import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MenuPageNavBar from "../MenuPageNavBar";
import CategoryTableRow from "./CategoryTableRow";
import "./CategoryManagementPage.css";
import "../TableStyling.css";

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
            {/* <Link
              to={`/business/${businessId}/menu/items/new`}
              className="bt-black bt-pd"
            >
              <i className="fa-solid fa-plus"></i> Add Category
            </Link> */}
          </div>
        </div>
      </header>
      <div>
        <table className="business-table category-table">
          <thead>
            <tr>
              <th className="flex flex-11"></th>
              <th className="flex flex-11">Items</th>
              <th className="flex flex-01">Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <CategoryTableRow
                categoryId={c.id}
                key={c.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
