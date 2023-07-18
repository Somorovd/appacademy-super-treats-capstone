import { useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import CartSidebar from "../CartSidebar";
import "./CartCard.css";

export default function CartCard({ cart }) {
  const { setModalContent, setModalClass } = useModal();
  const address = useSelector((state) => state.session.address);

  const handleClick = () => {
    setModalClass("flex flex-20 fh");
    setModalContent(<CartSidebar cart={cart} />);
  };

  return (
    <div
      className="cart-card"
      onClick={handleClick}
    >
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
