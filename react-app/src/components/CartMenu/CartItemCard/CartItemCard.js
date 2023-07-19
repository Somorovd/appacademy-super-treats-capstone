import { useState } from "react";
import "./CartItemCard.css";

export default function CartItemCard({ cartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
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
