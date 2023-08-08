import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  thunkGetOneBusiness,
  thunkGetAllBusinesses,
} from "../../store/businesses";
import PageHeader from "../PageHeader";
import CartMenu from "../CartMenu";
import ItemCard from "./ItemCard";
import CategorySidebar from "./CategorySidebar";
import "./ItemBrowsingPage.css";

export default function ItemBrowsingPage() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector((state) => state.businesses.singleBusiness);
  const haveAllBusinesses = useSelector(
    (state) => state.businesses.allBusinesses[businessId]
  );

  useEffect(() => {
    dispatch(thunkGetOneBusiness(businessId));
    if (!haveAllBusinesses) dispatch(thunkGetAllBusinesses(businessId));
  }, [dispatch, businessId]);

  useEffect(() => {
    const firstNonPicElement = document.querySelectorAll(
      ".item-card--image+.item-card--no-image"
    );

    for (let ele of firstNonPicElement) {
      const spacer = document.createElement("div");
      spacer.classList.add("flex-spacer");
      ele.parentNode.insertBefore(spacer, ele);
    }
  });

  if (business?.id !== Number(businessId)) return null;

  const categories = Object.values(business.categories).sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="business-browsing">
      <CartMenu />
      <header className="business-browsing__header flex-c">
        <PageHeader auth={true} />
        <img
          className="business-banner fw"
          src={business.image}
          alt=""
        />
        <div className="business-details pg-pd flex-c">
          <h2 className="business-details__name">{business.name}</h2>
          <p className="flex">
            <span>
              <i className="fa-solid fa-star"></i> {business.rating}
            </span>
            &bull;
            <span>{business.cuisine || business.type}</span>
            &bull;
            <span>{business.priceRange}</span>
          </p>
        </div>
      </header>
      <div className="business-browsing__body flex pg-pd">
        <CategorySidebar categories={categories} />
        <div className="fw">
          {categories.map((c) => (
            <section
              id={`category-${c.id}`}
              className="category-section"
            >
              <h2 className="category-section__heading">{c.name}</h2>
              <div className="item-grid">
                {c.itemIds.map((i) => (
                  <ItemCard
                    itemId={i}
                    key={i}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
