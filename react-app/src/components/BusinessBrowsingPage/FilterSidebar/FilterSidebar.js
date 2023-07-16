import { useState } from "react";
import "./FilterSidebar.css";

const orderOptions = [
  "Picked for you (default)",
  "Most popular",
  "Rating",
  "Delivery time",
];

const priceRangeOptions = {
  $: false,
  $$: false,
  $$$: false,
  $$$$: false,
};

export default function FilterSidebar() {
  const [order, setOrder] = useState(orderOptions[0]);
  const [priceRange, setPriceRange] = useState({ ...priceRangeOptions });

  return (
    <div className="filter-sidebar">
      <h2> Filters * </h2>
      <section className="filter-sidebar__section">
        <h3>Sort</h3>
        <div className="order-radios flex-c">
          {orderOptions.map((o) => (
            <div className="flex">
              <input
                id={o}
                type="radio"
                name="order"
                value={o}
                checked={order === o}
                onChange={() => setOrder(o)}
              />
              <label htmlFor={o}>{o}</label>{" "}
            </div>
          ))}
        </div>
      </section>
      <section className="filter-sidebar__section">
        <h3>Price Range</h3>
        <div className="price-checks flex-c">
          {Object.keys(priceRangeOptions).map((p) => (
            <div className="flex">
              <input
                type="checkbox"
                value={p}
                onChange={(e) =>
                  setPriceRange((pr) => ({ ...pr, [p]: !pr[p] }))
                }
                checked={priceRange[p]}
              />
              <label>{p}</label>
            </div>
          ))}
        </div>
      </section>
      <footer>* Coming Soon</footer>
    </div>
  );
}
