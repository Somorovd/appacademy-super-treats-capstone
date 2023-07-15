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
      <div className="item-actions">
        <Link
          to={`/business/${businessId}/items/new`}
          className="add-item-button bt-black bt-pd"
        >
          <i className="fa-solid fa-plus"></i> Add Item
        </Link>
      </div>
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
