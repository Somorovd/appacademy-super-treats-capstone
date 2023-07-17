import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetAllCarts } from "../../store/carts";
import AllCartsMenu from "./AllCartsMenu";
import SingleCartMenu from "./SingleCartMenu";
import "./CartMenu.css";

export default function CartMenu() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const carts = useSelector((state) => state.carts);
  const currentCart = carts[businessId];

  useEffect(() => {
    dispatch(thunkGetAllCarts());
  }, [dispatch]);

  return (
    <div className="carts-menu__wrapper pg-pd">
      <div className="carts-menu bt-pd">
        {currentCart && <SingleCartMenu />}
        <AllCartsMenu />
      </div>
    </div>
  );
}
