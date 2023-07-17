import { useSelector } from "react-redux";
import "./CartCard.css";

export default function CartCard({ cart }) {
  const address = useSelector((state) => state.session.address);
  return (
    <div className="cart-card">
      <div className="cart-card__image"></div>
      <div className="cart-card__info flex-c">
        <h3 className="cart-card__name">{cart.business.name}</h3>
        <p>Subtotal: ${cart.price}</p>
        <p>Deliver to {address}</p>
      </div>
      <div className="cart-card__icons"></div>
    </div>
  );
}
