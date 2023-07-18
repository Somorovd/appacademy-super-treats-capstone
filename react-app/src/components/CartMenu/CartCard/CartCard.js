import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import CartSidebar from "../CartSidebar";
import "./CartCard.css";

export default function CartCard({ cart }) {
  const { setModalContent } = useModal();

  const handleClick = () => {
    setModalContent(<CartSidebar cart={cart} />);
  };

  return (
    <div
      className="cart-card"
      onClick={handleClick}
    >
      <img
        className="cart-card__image"
        src={cart.business.image}
        alt=""
      />
      <div className="cart-card__info flex-c">
        <h3 className="cart-card__name">{cart.business.name}</h3>
        <p>Subtotal: ${cart.price}</p>
        <p>Deliver to {cart.address}</p>
      </div>
      <div className="cart-card__icons"></div>
    </div>
  );
}
