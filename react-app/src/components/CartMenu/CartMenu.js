import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetAllCarts } from "../../store/carts";
import "./CartMenu.css";

export default function CartMenu() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(thunkGetAllCarts());
  }, [dispatch]);

  return <h1> CartMenu </h1>;
}
