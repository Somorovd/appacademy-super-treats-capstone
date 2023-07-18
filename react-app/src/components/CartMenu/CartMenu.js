import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AllCartsMenu from "./AllCartsMenu";
import SingleCartMenu from "./SingleCartMenu";

import { thunkGetAllCarts } from "../../store/carts";
import "./CartMenu.css";

export default function CartMenu() {
  const { businessId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const cartsObj = useSelector((state) => state.carts);
  const carts = Object.values(cartsObj);
  const currentCart = cartsObj[businessId];

  useEffect(() => {
    dispatch(thunkGetAllCarts());
  }, [dispatch]);

  if (!user) return null;

  return (
    <div className="carts-menu__wrapper pg-pd">
      <div className="carts-menu flex">
        {currentCart && <SingleCartMenu />}
        {carts.length > 0 && <AllCartsMenu />}
      </div>
    </div>
  );
}
