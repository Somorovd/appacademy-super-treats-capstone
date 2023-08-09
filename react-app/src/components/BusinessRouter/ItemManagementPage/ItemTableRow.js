import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US");
};

export default function ItemTableRow({ itemId }) {
  const { businessId } = useParams();
  const item = useSelector((state) => state.items.allItems[itemId]);
  const category = useSelector(
    (state) => state.userBusinesses.singleBusiness.categories[item.categoryId]
  );

  if (!item) return null;

  return (
    <tr key={item.id}>
      <td className="flex flex-11">
        {item.image && (
          <img
            className="item-table__image"
            src={item.image}
            alt=""
          />
        )}
      </td>
      <td className="flex flex-01">
        {category ? (
          <p className="item-table__category">{category.name}</p>
        ) : (
          <p className="auth-error">item will be hidden</p>
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
