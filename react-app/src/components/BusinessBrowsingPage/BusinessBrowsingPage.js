import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../PageHeader";
import BusinessCard from "./BusinessCard";

import { thunkGetAllBusinesses } from "../../store/businesses";
import "./BusinessBrowsingPage.css";

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
      <header className="business-browsing__header">
        <PageHeader />
        <div className="filter-bar flex flex-11">
          <div className="filter-icon flex-c flex-01">
            <img
              src=""
              alt=""
            />
            <p>Pizza</p>
          </div>
          <div className="filter-icon flex-c">
            <img
              src=""
              alt=""
            />
            <p>Sushi</p>
          </div>
        </div>
        <div className="deals-bar flex">
          <div className="deal-card">What a great deal!</div>
          <div className="deal-card">This one is better!</div>
          <div className="deal-card">
            You'll kick yourself if you miss this!
          </div>
        </div>
      </header>
      <div className="business-browsing__body flex">
        <div className="filter-sidebar"></div>
        <div className="business-browsing__content fw">
          {allBusinesses.map((b) => (
            <BusinessCard
              business={b}
              key={b.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
