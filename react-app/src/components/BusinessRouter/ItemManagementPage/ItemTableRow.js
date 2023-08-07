import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US");
};

export default function ItemTableRow({ itemId }) {
  const { businessId } = useParams();
  const item = useSelector((state) => state.items.allItems[itemId]);

  if (!item) return null;

  return (
    <tr key={item.id}>
      <td className="flex flex-11">
        {item.image ? (
          <img
            className="item-table__image"
            src={item.image}
            alt=""
          />
        ) : (
          "n/a"
        )}
      </td>
      <td className="flex flex-01">
        <Link
          className="item-table__link"
          to={`/business/${businessId}/menu/items/${item.id}`}
        >
          {item.name}
        </Link>
      </td>
      <td className="flex flex-11">
        <p className="item-table__price">
          <span>$</span>
          <span>{item.price}</span>
        </p>
      </td>
      <td className="flex flex-11">{formatDate(item.updatedAt)}</td>
    </tr>
  );
}
