import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetOneBusiness } from "../../store/businesses";
import PageHeader from "../PageHeader";
import CartMenu from "../CartMenu";
import ItemCard from "./ItemCard";
import CategorySidebar from "./CategorySidebar";
import "./ItemBrowsingPage.css";

export default function ItemBrowsingPage() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector((state) => state.businesses.singleBusiness);
  const itemIds = business.items;

  useEffect(() => {
    console.log("use effect");
    dispatch(thunkGetOneBusiness(businessId));
  }, [dispatch, businessId]);

  if (business?.id !== Number(businessId)) return null;

  return (
    <div className="business-browsing">
      <CartMenu />
      <header className="business-browsing__header">
        <PageHeader auth={true} />
      </header>
      <div className="business-browsing__body flex pg-pd">
        <CategorySidebar />
        <div className="item-grid fw">
          {itemIds.map((i) => (
            <ItemCard
              itemId={i}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
