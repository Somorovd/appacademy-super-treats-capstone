import { useEffect, useState } from "react";

import { store } from "../../../../src";
import { actionChangeOrder } from "../../../store/businesses";
import "./FilterSidebar.css";
import { useSelector } from "react-redux";

const orderOptions = [
  {
    text: "Picked for you (default)",
    name: "default",
    property: (b) => b.id,
    desc: false,
  },
  {
    text: "A-Z",
    name: "a-z",
    property: (b) => b.name,
    desc: false,
  },
  {
    text: "Rating",
    name: "rating",
    property: (b) => Number(b.rating),
    desc: true,
  },
  {
    text: "Delivery fee",
    name: "delivery",
    property: (b) => Number(b.deliveryFee),
    desc: false,
  },
];

const priceRangeOptions = {
  $: false,
  $$: false,
  $$$: false,
  $$$$: false,
};

export default function FilterSidebar() {
  const storeOrder = useSelector((state) => state.businesses.order.active);
  const [order, setOrder] = useState({});
  const [priceRange, setPriceRange] = useState({ ...priceRangeOptions });

  const handleChangeOrder = (order) => {
    setOrder(order);
    store.dispatch(actionChangeOrder(order.name, order.property, order.desc));
  };

  useEffect(() => {
    handleChangeOrder(orderOptions.find((o) => o.name === storeOrder));
  }, []);

  return (
    <div className="filter-sidebar">
      <h2 className="flex flex-01 g10">Filters</h2>
      <section className="filter-sidebar__section">
        <h3>Sort</h3>
        <div className="flex-c">
          {orderOptions.map((o, i) => (
            <div
              className="flex"
              key={i}
            >
              <input
                id={o.name}
                className="order-radio"
                type="radio"
                name="order"
                value={o.name}
                checked={order === o}
                onChange={() => handleChangeOrder(o)}
              />
              <label htmlFor={o.name}>{o.text}</label>{" "}
            </div>
          ))}
        </div>
      </section>
      <section className="filter-sidebar__section">
        <h3 className="flex flex-b1">
          <span className="flex flex-01 g10">
            Price Range
            <span className="coming-soon-banner">Coming Soon</span>
          </span>
          <span className="price-count bt-black flex flex-11">
            {Object.values(priceRange).filter((pr) => pr).length || ""}
          </span>
        </h3>
        <div className="price-checks flex">
          {Object.keys(priceRangeOptions).map((p, i) => (
            <div
              className="flex"
              key={i}
            >
              <input
                id={p}
                type="checkbox"
                value={p}
                onChange={(e) =>
                  setPriceRange((pr) => ({ ...pr, [p]: !pr[p] }))
                }
                checked={priceRange[p]}
              />
              <label
                htmlFor={p}
                className="price-checkbox"
              >
                {p}
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
