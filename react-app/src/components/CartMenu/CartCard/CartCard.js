import { useModal } from "../../../context/Modal";

import CartSidebar from "../CartSidebar";
import "./CartCard.css";

export default function CartCard({ cart }) {
  const { setModalContent, setModalClass } = useModal();

  const cartItems = Object.values(cart.cartItems);

  const handleClick = () => {
    setModalClass("flex flex-20 fh");
    setModalContent(<CartSidebar businessId={cart.business.id} />);
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
        <p>Deliver to {cart.address.split(/[,\n]/)[0]}</p>
      </div>
      <div className="cart-card__icons flex flex-11">
        <span className="cart-size bt-black flex flex-11">
          {cartItems.length}
        </span>
        <span>
          <i className="fa-solid fa-chevron-right"></i>
        </span>
      </div>
    </div>
  );
}
