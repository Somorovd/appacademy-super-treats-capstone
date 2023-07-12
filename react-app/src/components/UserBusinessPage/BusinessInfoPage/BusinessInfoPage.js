import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./BusinessInfoPage.css";
import { useEffect } from "react";

export default function BusinessInfoPage() {
  const dispatch = useDispatch();
  const { businessId } = useParams();

  const business = useSelector((state) => state.userBusinesses.singleBusiness);

  useEffect(() => {
    // get single business
  }, [dispatch]);

  if (!business) return <></>;

  return (
    <div className="business-info flex">
      <div className="business-info-nav"></div>
      <div className="business-info-content">
        <h1>{business.id}</h1>
      </div>
    </div>
  );
}
