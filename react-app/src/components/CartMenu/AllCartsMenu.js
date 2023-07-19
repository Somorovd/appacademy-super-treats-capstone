import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";

export default function AllCartsMenu({ min }) {
  const cartsDropdownRef = useRef();
  const [hidden, setHidden] = useState(true);

  const cartsObj = useSelector((state) => state.carts);
  const carts = Object.values(cartsObj);

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

  return (
    <>
      <div
        className="cart-bt all-carts flex flex-11 bt-pd bt-black"
        onClick={openMenu}
      >
        <i className="fa-solid fa-cart-shopping"></i>
        {!min && (
          <>
            <span>{carts?.length || 0} carts</span>
            <i className="fa-solid fa-angle-down"></i>
          </>
        )}
      </div>
      {carts.length !== 0 && (
        <div
          className={"all-carts__dropdown " + (hidden ? "hidden" : "")}
          ref={cartsDropdownRef}
        >
          {carts.map((cart) => (
            <CartCard
              cart={cart}
              key={cart.id}
            />
          ))}
        </div>
      )}
    </>
  );
}
