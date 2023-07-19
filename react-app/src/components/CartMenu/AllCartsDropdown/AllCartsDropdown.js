import { useSelector } from "react-redux";

import CartCard from "../CartCard";
import "./AllCartsDropdown.css";

export default function AllCartsDropdown({ top, right }) {
  const cartsObj = useSelector((state) => state.carts);
  const carts = Object.values(cartsObj);

  return (
    carts.length !== 0 && (
      <div
        className={"all-carts__dropdown"}
        style={{ top, right }}
      >
        {carts.map((cart) => (
          <CartCard
            cart={cart}
            key={cart.id}
          />
        ))}
      </div>
    )
  );
}
