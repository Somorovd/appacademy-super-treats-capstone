import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import MenuPageNavBar from "../MenuPageNavBar";
import ItemTableRow from "./ItemTableRow";
import "./ItemManagementPage.css";
import "../TableStyling.css";

export default function ItemManagementPage() {
  const { businessId } = useParams();

  const itemsObj = useSelector((state) => state.items.allItems);
  const itemIds = Object.keys(itemsObj);

  return (
    <>
      <div className="item-management-page">
        <header>
          <MenuPageNavBar />
          <div
            id="item-management-header"
            className="flex flex-b1"
          >
            <h2>Menu Items</h2>
            <div className="flex">
              <Link
                to={`/business/${businessId}/menu/items/new`}
                className="bt-black bt-pd"
              >
                <i className="fa-solid fa-plus"></i> Add Item
              </Link>
            </div>
          </div>
        </header>
        <table className="business-table item-table">
          <thead>
            <tr>
              <th className="flex flex-11">Photo</th>
              <th className="flex flex-01">Category</th>
              <th className="flex flex-01">Name</th>
              <th className="flex flex-11">Price</th>
              <th className="flex flex-11">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {itemIds.map((i) => (
              <ItemTableRow
                itemId={i}
                key={i}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
