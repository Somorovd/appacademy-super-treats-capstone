import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import ItemTableRow from "./ItemTableRow";
import "./ItemManagementPage.css";

export default function ItemManagementPage() {
  const { businessId } = useParams();

  const business = useSelector((state) => state.userBusinesses.singleBusiness);
  const itemIds = business.items;

  return (
    <div className="item-management-page">
      <header className="business-header">
        <h2>Menu Items</h2>
        <div className="flex">
          <Link
            to={`/business/${businessId}/items/new`}
            className="bt-black bt-pd"
          >
            <i className="fa-solid fa-plus"></i> Add Item
          </Link>
        </div>
      </header>
      <table className="business-item-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Last Updated</th>
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
  );
}
