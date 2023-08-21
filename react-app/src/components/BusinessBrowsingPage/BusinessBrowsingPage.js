import { useEffect, useState } from "react";
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
  Pharmacy: "filter-icons/pharmacy.png",
  Alcohol: "filter-icons/alcohol.png",
  BBQ: "filter-icons/bbq.png",
  Breakfast: "filter-icons/breakfast.png",
  "Fast Food": "filter-icons/fast-food.png",
  "Pet Supplies": "filter-icons/pet-supplies.png",
  Flowers: "filter-icons/flowers.png",
  Asian: "filter-icons/asian.png",
  Indian: "filter-icons/indian.png",
  Seafood: "filter-icons/seafood.png",
  Pizza: "filter-icons/pizza.png",
  Sushi: "filter-icons/sushi.png",
  "Coffee and Tea": "filter-icons/coffee-tea.png",
  Healthy: "filter-icons/healthy.png",
  "Ice Cream + Frozen Yogurt": "filter-icons/ice-cream-frozen-yogurt.png",
  Desserts: "filter-icons/desserts.png",
};

export default function BusinessBrowsingPage() {
  const dispatch = useDispatch();
  const allBusinessesObject = useSelector(
    (state) => state.businesses.allBusinesses
  );
  const businessOrder = useSelector(
    (state) => state.businesses.order[state.businesses.order.active]
  );
  const businessFilters = useSelector((state) => state.businesses.filters);
  const [validateBusiness, setValidateBusiness] = useState(() => (b) => true);

  useEffect(() => {
    dispatch(thunkGetAllBusinesses());
  }, [dispatch]);

  useEffect(() => {
    setValidateBusiness(() => (b) => {
      for (let filter in businessFilters) {
        if (!businessFilters[filter].validate(b)) return false;
      }
      return true;
    });
  }, [businessFilters]);

  return (
    <div className="business-browsing flex-c">
      <CartMenu />
      <header className="business-browsing__header">
        <PageHeader auth={true} />
        <div className="pg-pd">
          <div className="filter-bar flex g10">
            {Object.keys(filterCategories).map((cat, i) => (
              <FilterIcon
                text={cat}
                key={i}
                src={filterCategories[cat]}
              />
            ))}
          </div>
          {/* <div className="deals-bar flex">
            <div className="deal-card">What a great deal!</div>
            <div className="deal-card">This one is better!</div>
            <div className="deal-card">
              You'll kick yourself if you miss this!
            </div>
          </div> */}
        </div>
      </header>
      <div className="business-browsing__body flex pg-pd">
        <FilterSidebar />
        <div className="business-browsing__content fw">
          {businessOrder &&
            businessFilters &&
            businessOrder
              .filter((businessId) =>
                validateBusiness(allBusinessesObject[businessId])
              )
              .map((businessId) => (
                <BusinessCard
                  business={allBusinessesObject[businessId]}
                  isBrowsing={true}
                  key={businessId}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
