import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetOneBusiness } from "../../../store/userBusinesses";
import "./BusinessInfoPage.css";

export default function BusinessInfoPage() {
  const dispatch = useDispatch();
  const { businessId } = useParams();

  const business = useSelector((state) => state.userBusinesses.singleBusiness);

  useEffect(() => {
    dispatch(thunkGetOneBusiness(businessId));
  }, [dispatch]);

  if (!business) return <></>;

  return (
    <div className="business-info flex">
      <div className="business-info-nav fh"></div>
      <div className="business-info-content">
        <h1>{business.name}</h1>
      </div>
    </div>
  );
}
