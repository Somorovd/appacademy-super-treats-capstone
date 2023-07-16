import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
          <p>
            <a href="/signup">Sign In</a> for your recent addresses
          </p>
        </div>
      </div>
    </div>
  );
}
