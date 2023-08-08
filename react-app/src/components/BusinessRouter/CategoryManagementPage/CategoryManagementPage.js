import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";

import MenuPageNavBar from "../MenuPageNavBar";
import CategoryTableRow from "./CategoryTableRow";
import CreateCategoryModal from "./CreateCategoryModal";
import { thunkReorderCategories } from "../../../store/userBusinesses";
import "./CategoryManagementPage.css";
import "../TableStyling.css";

export default function CategoryManagementPage() {
  const { businessId } = useParams();
  const { setModalContent, setModalClass } = useModal();
  const dispatch = useDispatch();
  const categoryTable = useRef();
  const [orderChanged, setOrderChanged] = useState(false);

  const business = useSelector((state) => state.userBusinesses.singleBusiness);
  const categoriesObj = useSelector(
    (state) => state.userBusinesses.singleBusiness.categories
  );
  const categories = Object.values(categoriesObj);
  categories.sort((a, b) => a.order - b.order);

  const handleAddCategory = () => {
    setModalContent(<CreateCategoryModal businessId={businessId} />);
    setModalClass("flex flex-11");
  };

  const handleUpdateOrder = () => {
    const rows = categoryTable.current.querySelectorAll("tr");
    const order = { business_id: Number(businessId), categories: {} };
    for (let row of rows) {
      order.categories[row.dataset.id] = row.dataset.order;
    }
    dispatch(thunkReorderCategories(order));
    setOrderChanged(false);
  };

  return (
    <div className="category-management-page">
      <header>
        <MenuPageNavBar />
        <div
          id="category-management-header"
          className="flex flex-b1"
        >
          <h2>Menu Categories</h2>
          <div className="flex g10">
            {orderChanged && (
              <button
                className="bt-black bt-pd"
                onClick={handleUpdateOrder}
              >
                Save Category Order
              </button>
            )}
            <button
              className="bt-black bt-pd"
              onClick={handleAddCategory}
            >
              <i className="fa-solid fa-plus"></i> Add Category
            </button>
          </div>
        </div>
      </header>
      <div>
        <table className="business-table category-table">
          <thead>
            <tr>
              <th className="flex flex-11">Items</th>
              <th className="flex flex-01">Category</th>
              <th className="flex flex-11"></th>
            </tr>
          </thead>
          <tbody ref={categoryTable}>
            {categories.map((c) => (
              <CategoryTableRow
                key={c.id}
                categoryId={c.id}
                maxRow={business.categories.length - 1}
                setOrderChanged={setOrderChanged}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
