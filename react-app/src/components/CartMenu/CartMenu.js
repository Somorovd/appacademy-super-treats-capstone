import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetAllCarts } from "../../store/carts";
import AllCartsMenu from "./AllCartsMenu";
import SingleCartMenu from "./SingleCartMenu";
import CartCard from "./CartCard";
import "./CartMenu.css";

export default function CartMenu() {
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const cartsDropdownRef = useRef();
  const [hidden, setHidden] = useState(true);

  const cartsObj = useSelector((state) => state.carts);
  const carts = Object.values(cartsObj);
  const currentCart = carts[businessId];

  useEffect(() => {
    dispatch(thunkGetAllCarts());
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch]);

  const openMenu = (e) => {
    e.stopPropagation();
    if (hidden) setHidden(false);
    else closeMenu(e);
  };

  const closeMenu = (e) => {
    setHidden(true);
  };

  return (
    <div
      className="carts-menu__wrapper pg-pd"
      onClick={openMenu}
    >
      <div className="carts-menu bt-pd bt-black">
        {currentCart && <SingleCartMenu />}
        <AllCartsMenu />
      </div>
      <div
        className={"all-carts__dropdown " + (hidden ? "hidden" : "")}
        ref={cartsDropdownRef}
      >
        {carts.map((cart) => (
          <CartCard cart={cart} />
        ))}
      </div>
    </div>
  );
}
