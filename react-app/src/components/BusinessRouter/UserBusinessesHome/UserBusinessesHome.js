import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { thunkGetAllBusinesses } from "../../../store/userBusinesses";
import BusinessCard from "../../BusinessBrowsingPage/BusinessCard";
import BusinessMenu from "../BusinessMenu";
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
    <div className="business-page">
      <BusinessMenu />
      <div className="user-business__home pg-pd fh">
        <header className="business-header">
          <h2>Your Businesses</h2>
          <Link
            to="business/create"
            className="bt-black bt-pd"
          >
            <i className="fa-solid fa-plus"></i> Add Your Business
          </Link>
        </header>
        <div className="user-business__grid">
          {allBusinesses.map((b) => (
            <div onClick={() => history.push(`/business/${b.id}`)}>
              <BusinessCard
                business={b}
                isBrowsing={false}
                key={b.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
