import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";

import PageHeader from "../PageHeader";
import { thunkSetLocation } from "../../store/session";

import "./LandingPage.css";

const bgImg = "/src/resources/images/landing-page-background.png";

export default function LandingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState("delivery");

  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(thunkSetLocation(address, delivery));
    history.push("/feed");
  };

  return (
    <div className="landing-page fh flex-c pg-pd">
      <div
        className="landing-page__background"
        style={{ width: window.screen.width, height: window.screen.height }}
      ></div>
      <PageHeader />
      <div className="landing__content flex flex-01 fh">
        <div className="landing__address-form-wrapper">
          <h1>Order food to your door</h1>
          <form
            className="landing__address-form flex"
            onSubmit={handleSubmit}
          >
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            >
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
            </select>
            <button className="bt-black">Find Food</button>
          </form>
          <p className="signup-link">
            {!user && (
              <>
                <Link to="/signup">Sign In</Link> for your recent addresses
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
