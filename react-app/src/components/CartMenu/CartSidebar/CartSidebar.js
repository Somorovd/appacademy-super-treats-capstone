import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import CartItemCard from "../CartItemCard";

import { thunkDeleteCart } from "../../../store/carts";
import "./CartSidebar.css";
import { useDispatch } from "react-redux";

export default function CartSidebar({ cart }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownRef = useRef();
  const [hidden, setHidden] = useState(true);

  const { setModalClass, closeModal } = useModal();
  setModalClass("flex flex-20 fh");
  const cartItems = Object.values(cart.cartItems);

  const openMenu = (e) => {
    e.stopPropagation();
    if (hidden) setHidden(false);
    else closeMenu(e);
  };

  const closeMenu = (e) => {
    setHidden(true);
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const handleAddItems = () => {
    history.push(`/feed/${cart.business.id}`);
    closeModal();
  };

  const handleClearCart = () => {
    dispatch(thunkDeleteCart(cart.id));
    closeModal();
  };

  return (
    <div className="cart-sidebar flex-c">
      <div className="cart-sidebar__actions flex flex-b1">
        <button
          className="close-sidebar"
          onClick={closeModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div>Carts</div>
      </div>
      <div className="flex">
        <h2> Cart for {cart.business.name} </h2>
        <button
          className="cart-sidebar__dropdown-button bt-pd flex flex-11"
          onClick={openMenu}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>
        <ul
          className={
            "cart-sidebar__dropdown flex-c" + (hidden ? " hidden" : "")
          }
          ref={dropdownRef}
        >
          <li>
            <div className="flex flex-11">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div
              className="flex flex-01"
              onClick={handleAddItems}
            >
              <p>Add Items</p>
            </div>
          </li>
          <li className="delete-cart">
            <div className="flex flex-11">
              <i className="fa-solid fa-trash"></i>
            </div>
            <div
              className="flex flex-01"
              onClick={handleClearCart}
            >
              <p>Clear Cart</p>
            </div>
          </li>
        </ul>
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
