import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetAllBusinesses } from "../../store/businesses";
import PageHeader from "../PageHeader";
import BusinessCard from "./BusinessCard";
import FilterIcon from "./FilterIcon/FilterIcon";
import FilterSidebar from "./FilterSidebar";
import CartMenu from "../CartMenu";
import "./BusinessBrowsingPage.css";

const filterCategories = {
  Grocery: "filter-icons/grocery.png",
  Convenience: "filter-icons/convenience.png",
  Breakfast: "filter-icons/breakfast.png",
  American: "filter-icons/american.png",
  BBQ: "filter-icons/bbq.png",
  Alcohol: "filter-icons/alcohol.png",
  Pharmacy: "filter-icons/pharmacy.png",
  "Pet Supplies": "filter-icons/pet-supplies.png",
  Flowers: "filter-icons/flowers.png",
  Asian: "filter-icons/asian.png",
  Pizza: "filter-icons/pizza.png",
  "Coffee and Tea": "filter-icons/coffee-tea.png",
  Bakery: "filter-icons/bakery.png",
  Healthy: "filter-icons/healthy.png",
  "Ice Cream + Frozen Yogurt": "filter-icons/ice-cream-frozen-yogurt.png",
  Desserts: "filter-icons/desserts.png",
};

export default function BusinessBrowsingPage() {
  const dispatch = useDispatch();
  const allBusinessesObject = useSelector(
    (state) => state.businesses.allBusinesses
  );
  const allBusinesses = Object.values(allBusinessesObject);

  useEffect(() => {
    dispatch(thunkGetAllBusinesses());
  }, [dispatch]);

  return (
    <div className="business-browsing">
      <CartMenu />
      <header className="business-browsing__header">
        <PageHeader auth={true} />
        <div className="pg-pd">
          <div className="filter-bar flex">
            {Object.keys(filterCategories).map((cat, i) => (
              <FilterIcon
                text={cat}
                key={i}
                src={filterCategories[cat]}
              />
            ))}
          </div>
          <div className="deals-bar flex">
            <div className="deal-card">What a great deal!</div>
            <div className="deal-card">This one is better!</div>
            <div className="deal-card">
              You'll kick yourself if you miss this!
            </div>
          </div>
        </div>
      </header>
      <div className="business-browsing__body flex pg-pd">
        <FilterSidebar />
        <div className="business-browsing__content fw">
          {allBusinesses.map((b) => (
            <BusinessCard
              business={b}
              isBrowsing={true}
              key={b.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
