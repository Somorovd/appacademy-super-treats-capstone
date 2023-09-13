import "./BusinessBrowsingPage.css";

import {
  fetchAllBusinesses,
  selectActiveOrder,
  selectAllBusinesses,
  selectBusinessFilters,
  selectBusinessStatus,
} from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BusinessCard from "./BusinessCard";
import CartMenu from "../CartMenu";
import FilterIcon from "./FilterIcon/FilterIcon";
import FilterSidebar from "./FilterSidebar";
import PageHeader from "../PageHeader";

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

  const businessStatus = useSelector(selectBusinessStatus);
  const allBusinesses = useSelector(selectAllBusinesses);
  const businessOrder = useSelector(selectActiveOrder);
  const businessFilters = useSelector(selectBusinessFilters);

  const [validateBusiness, setValidateBusiness] = useState(() => (b) => true);

  useEffect(() => {
    if (businessStatus === "idle") {
      dispatch(fetchAllBusinesses());
    }
  }, [dispatch, businessStatus]);

  useEffect(() => {
    setValidateBusiness(() => {
      return (b) =>
        Object.values(businessFilters).every((filter) => filter.validate(b));
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
        </div>
      </header>
      <div className="business-browsing__body flex pg-pd">
        {/* <FilterSidebar /> */}
        <div className="business-browsing__content fw">
          {businessOrder &&
            businessFilters &&
            businessOrder
              .filter((businessId) =>
                validateBusiness(allBusinesses[businessId])
              )
              .map((businessId) => (
                <BusinessCard
                  business={allBusinesses[businessId]}
                  isBrowsing={true}
                  key={businessId}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
