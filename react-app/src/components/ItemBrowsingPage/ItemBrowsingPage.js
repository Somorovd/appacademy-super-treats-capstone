import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetOneBusiness } from "../../store/businesses";
import PageHeader from "../PageHeader";
import CartMenu from "../CartMenu";
import ItemCard from "./ItemCard";
import "./ItemBrowsingPage.css";

export default function ItemBrowsingPage() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector((state) => state.businesses.singleBusiness);
  const itemIds = business.items;

  useEffect(() => {
    dispatch(thunkGetOneBusiness(businessId));
  }, [dispatch]);

  if (business?.id !== Number(businessId)) return null;

  return (
    <div className="business-browsing">
      <CartMenu />
      <header className="business-browsing__header">
        <PageHeader />
        <div className="pg-pd">
          <h1> {business.name} </h1>
          <div className="item-grid">
            {itemIds.map((i) => (
              <ItemCard itemId={i} />
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}
