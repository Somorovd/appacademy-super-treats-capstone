import { useSelector, useDispatch } from "react-redux";

import { thunkAddToCart } from "../../../store/carts";
import "./ItemCard.css";

export default function ItemCard({ itemId }) {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items.allItems[itemId]);
  const user = useSelector((state) => state.session.user);

  const addToCart = () => {
    const itemObj = {
      item_id: item.id,
      quantity: 1,
      address: sessionStorage.getItem("current-address"),
    };
    dispatch(thunkAddToCart(itemObj));
  };

  if (!item) return null;

  return (
    <div
      className={
        "item-card " + (item.image ? "item-card--image" : "item-card--no-image")
      }
    >
      <p className="item-card__name">{item.name}</p>
      {user && (
        <button
          className="bt-black bt-pd add-to-cart flex flex-11"
          onClick={addToCart}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
    </div>
  );
}
