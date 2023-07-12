import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetAllBusinesses } from "../../../store/userBusinesses";
import BusinessCard from "../../BusinessBrowsingPage/BusinessCard";

import "./UserBusinessesHome.css";

export default function UserBusinessesHome() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allBusinessesObj = useSelector(
    (state) => state.userBusinesses.allBusinesses
  );
  const allBusinesses = Object.values(allBusinessesObj);

  useEffect(() => {
    dispatch(thunkGetAllBusinesses());
  }, [dispatch]);

  return (
    <div className="business-info flex fh">
      <div className="user-business__nav fh">
        <button onClick={() => history.push("/")}>Return to SuperTreats</button>
      </div>
      <div className="user-business__home fh">
        <h2>Your Businesses</h2>
        <div className="user-business__grid">
          {allBusinesses.map((b) => (
            <div onClick={() => history.push(`/business/${b.id}`)}>
              <BusinessCard
                business={b}
                key={b.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
