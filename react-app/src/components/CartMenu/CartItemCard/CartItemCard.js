import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { thunkEditCartItem } from "../../../store/carts";
import "./CartItemCard.css";

export default function CartItemCard({ businessId, cartItemId }) {
  const dispatch = useDispatch();

  const cartItem = useSelector(
    (state) => state.carts[businessId].cartItems[cartItemId]
  );

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleChangeQuantity = async (e) => {
    if (e.target.value === quantity) return;

    const cartItemObj = {
      id: cartItem.id,
      cartId: cartItem.cartId,
      quantity: e.target.value,
    };

    const res = await dispatch(thunkEditCartItem(cartItemObj));
    if (!res.errors) setQuantity(e.target.value);
  };

  return (
    <div className="cart-item-card flex-c">
      <div className="flex flex-b1">
        <p>{cartItem.item.name}</p>
        <img
          src={cartItem.item.image}
          alt=""
        />
      </div>
      <div className="flex flex-b1">
        <select
          value={quantity}
          onChange={handleChangeQuantity}
          className="quantity-select"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <span>${cartItem.price}</span>
      </div>
    </div>
  );
}
