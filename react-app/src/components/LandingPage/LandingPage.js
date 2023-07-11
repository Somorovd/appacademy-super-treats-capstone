import { useState } from "react";
import PageHeader from "../PageHeader";

import "./LandingPage.css";

export default function LandingPage() {
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState("delivery");

  const handleSubmit = () => {};

  return (
    <div className="landing-page flex-c">
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
            <button>Find Food</button>
          </form>
          <p>
            <a href="/signup">Sign In</a> for your recent addresses
          </p>
        </div>
      </div>
    </div>
  );
}
