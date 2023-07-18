import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetAllBusinesses } from "../../store/businesses";
import PageHeader from "../PageHeader";
import BusinessCard from "./BusinessCard";
import FilterIcon from "./FilterIcon/FilterIcon";
import FilterSidebar from "./FilterSidebar";
import CartMenu from "../CartMenu";
import "./BusinessBrowsingPage.css";

const filterCategories = [
  "Grocery",
  "Convenience",
  "American",
  "Alcohol",
  "Pharmacy",
  "Baby",
  "Pet Supplies",
  "Flowers",
  "Retail",
  "Pizza",
  "Coffee and Tea",
  "Bakery",
  "Healthy",
  "Ice Cream + Frozen Yogurt",
  "Desserts",
];

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
            {filterCategories.map((i) => (
              <FilterIcon
                text={i}
                src=""
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
