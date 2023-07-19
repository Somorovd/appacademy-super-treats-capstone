import { useDispatch, useSelector } from "react-redux";

import { thunkDeleteCartItem, thunkEditCartItem } from "../../../store/carts";
import "./CartItemCard.css";

export default function CartItemCard({ businessId, cartItemId }) {
  const dispatch = useDispatch();

  const cartItem = useSelector(
    (state) => state.carts[businessId].cartItems[cartItemId]
  );

  const handleDelete = () => {
    const cartItemObj = {
      id: cartItem.id,
      cartId: cartItem.cartId,
      businessId,
    };
    dispatch(thunkDeleteCartItem(cartItemObj));
  };

  const handleChangeQuantity = (e) => {
    if (e.target.value === cartItem.quantity) return;
    if (e.target.value === "0") return handleDelete();

    const cartItemObj = {
      id: cartItem.id,
      cartId: cartItem.cartId,
      quantity: e.target.value,
    };

    dispatch(thunkEditCartItem(cartItemObj));
  };

  return (
    <div className="cart-item-card flex-c">
      <div className="flex flex-b1">
        <p className="cart-item-card__name">{cartItem.item.name}</p>
        <img
          src={cartItem.item.image}
          alt=""
        />
      </div>
      <div className="flex flex-b1">
        <select
          value={cartItem.quantity}
          onChange={handleChangeQuantity}
          className="quantity-select"
        >
          <option value={0}>Remove</option>
          {Array.from({ length: 98 }, (_, i) => (
            <option
              value={i + 1}
              key={i + 1}
            >
              {i + 1}
            </option>
          ))}
        </select>
        <span>${cartItem.price}</span>
      </div>
    </div>
  );
}
