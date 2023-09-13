import "./FilterSidebar.css";

import { changeFilter, changeOrder } from "../../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

const priceRangeOptions = ["$", "$$", "$$$", "$$$$"];

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const allBusinesses = useSelector((state) => state.businesses.allBusinesses);
  const storeOrder = useSelector((state) => state.businesses.order.active);
  const storeFilters = useSelector((state) => state.businesses.filters);
  const [order, setOrder] = useState({});
  const [priceRange, setPriceRange] = useState(
    storeFilters.priceRange?.value || new Set()
  );

  const handleChangeOrder = (order) => {
    setOrder(order);
    dispatch(changeOrder(order));
  };

  const handleChangePriceRange = (pr) => {
    setPriceRange((priceRange) => {
      const newPriceRange = new Set(priceRange);
      if (newPriceRange.has(pr)) newPriceRange.delete(pr);
      else newPriceRange.add(pr);

      const validatePriceRange = (business) => {
        if (!newPriceRange.size) return true;
        else return newPriceRange.has(business.priceRange);
      };

      dispatch(
        changeFilter({
          name: "priceRange",
          value: newPriceRange,
          validate: validatePriceRange,
        })
      );
      return newPriceRange;
    });
  };

  useEffect(() => {
    handleChangeOrder(orderOptions.find((o) => o.name === storeOrder));
  }, [allBusinesses]);

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
          Price Range
          <span className="price-count bt-black flex flex-11">
            {priceRange.size || ""}
          </span>
        </h3>
        <div className="price-checks flex">
          {priceRangeOptions.map((pr, i) => (
            <div
              className="flex"
              key={i}
            >
              <input
                id={pr}
                type="checkbox"
                value={pr}
                onChange={() => handleChangePriceRange(pr)}
                checked={priceRange.has(pr)}
              />
              <label
                htmlFor={pr}
                className="price-checkbox"
              >
                {pr}
              </label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
