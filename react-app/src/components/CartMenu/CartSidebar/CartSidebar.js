import { useModal } from "../../../context/Modal";
import CartItemCard from "../CartItemCard";
import "./CartSidebar.css";

export default function CartSidebar({ cart }) {
  const cartItems = Object.values(cart.cartItems);

  const { setModalClass } = useModal();
  setModalClass("flex flex-20 fh");

  return (
    <div className="cart-sidebar flex-c">
      <div className="cart-sidebar__actions flex flex-b1">
        <button>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div>Carts</div>
      </div>
      <div className="flex">
        <h2> Cart for {cart.business.name} </h2>
        <div className="cart-sidebar__dropdown">
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div>
        <div className="cart-sidebar__summary flex flex-b1">
          <span>{cartItems.length} items</span>
          <span>
            Subtotal: <strong>${cart.price}</strong>
          </span>
        </div>
        <div className="cart-item-list flex-c">
          {cartItems.map((i) => (
            <CartItemCard
              cartItem={i}
              key={i.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
