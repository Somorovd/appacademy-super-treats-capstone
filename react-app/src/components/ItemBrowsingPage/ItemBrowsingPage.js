import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetOneBusiness } from "../../store/businesses";
import PageHeader from "../PageHeader";
import CartMenu from "../CartMenu";
import "./ItemBrowsingPage.css";

export default function ItemBrowsingPage() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector((state) => state.businesses.singleBusiness);
  const itemsObj = useSelector((state) => state.items.allItems);
  const items = Object.values(itemsObj);

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
            {items.map((i) => (
              <div className="item-card">
                <p>{i.name}</p>
                <button className="bt-black bt-pd add-to-cart flex flex-11">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}