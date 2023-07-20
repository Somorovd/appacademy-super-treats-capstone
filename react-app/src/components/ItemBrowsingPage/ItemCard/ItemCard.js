import { useSelector } from "react-redux";

import AddToCart from "./AddToCart";
import "./ItemCard.css";

export default function ItemCard({ itemId }) {
  const item = useSelector((state) => state.items.allItems[itemId]);
  const user = useSelector((state) => state.session.user);

  if (!item) return null;

  return (
    <div
      className={
        "item-card " + (item.image ? "item-card--image" : "item-card--no-image")
      }
    >
      <img
        className="item-card__image"
        src={item.image}
        alt=""
      />
      <p className="item-card__name">{item.name}</p>
      {user && <AddToCart item={item} />}
      <p className="item-card__price">${item.price}</p>
    </div>
  );
}
