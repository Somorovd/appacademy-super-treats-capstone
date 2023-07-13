import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import {
  thunkCreateBusiness,
  thunkEditBusiness,
} from "../../../store/userBusinesses";
import "./CreateBusinessForm.css";

const cuisines = [
  "Alcohol",
  "Bakery",
  "BBQ",
  "Burgers",
  "Coffee & Tea",
  "Chinese",
  "French",
  "Ice Cream & Frozen Yogurt",
  "Pizza",
  "Sushi",
];

const defaultImage =
  "https://cdn.discordapp.com/attachments/723759214123679836/1129101930510172180/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

export default function CreateBusinessForm({ business, onSubmit }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState(business?.address || "");
  const [businessName, setBusinessName] = useState(business?.name || "");
  const [brandName, setBrandName] = useState("");
  const [type, setType] = useState(business?.type || "");
  const [cuisine, setCuisine] = useState(business?.cuisine || "");
  const [image, setImage] = useState(business?.image || "");
  const [imageText, setImageText] = useState(business?.image || "");
  const [priceRange, setPriceRange] = useState(business?.priceRange || "");
  const [deliveryFee, setDeliveryFee] = useState(business?.deliveryFee || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const businessObj = {
      address,
      cuisine: cuisine || null,
      name: businessName,
      type,
      id: business?.id,
      image: business ? image : "",
      price_range: business ? priceRange : "",
      delivery_fee: business ? deliveryFee : "",
    };

    const res = await dispatch(
      business
        ? thunkEditBusiness(businessObj)
        : thunkCreateBusiness(businessObj)
    );
    if (res.errors) setErrors(res.errors);
    else onSubmit() || history.push(`/business/${res.business.id}`);
  };

  const validateForm = () => {
    const errors = {};

    if (address.trim() === "") errors.address = "Enter a store address";
    if (address.trim().length > 255)
      errors.address = "The maximum characters allowed is 255";

    if (businessName.trim() === "") errors.name = "Enter a store name";
    if (businessName.trim().length > 100)
      errors.name = "The maximum characters allowed is 100";

    if (!business) {
      if (brandName.trim() === "") errors.brand = "Enter a brand name";
      if (brandName.trim().length > 100)
        errors.brand = "The maximum characters allowed is 100";
    }

    if (type.trim() === "") errors.type = "Select a business type";

    if (!image.trim().match(/(^|\.png|\.jpg|\.jpeg)$/))
      errors.image = "Image type not supported";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="create-business-page flex-c">
      <form
        className="create-business-form pg-pd flex-c"
        onSubmit={handleSubmit}
      >
        <h2> {business ? "Update your business profile" : "Get Started"}</h2>

        {business && (
          <div className="business-image-input flex-c">
            <img
              src={image}
              alt=""
              onError={(e) => {
                e.target.src = defaultImage;
                e.target.style = "object-fit: contain";
              }}
            />
            <label htmlFor="image">Banner Image</label>
            <input
              id="image"
              value={imageText}
              onChange={(e) => setImageText(e.target.value)}
              onBlur={(e) => setImage(e.target.value)}
            />
            <p className="auth-error">{errors.image}</p>
          </div>
        )}

        <div>
          <label htmlFor="business-address">Store Address</label>
          <input
            id="business-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="auth-error">{errors.address}</p>
        </div>

        <div>
          <label htmlFor="business-name">Store Name</label>
          <input
            id="business-name"
            placeholder="Example: App Academy - Feb. Online"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          {errors.name ? (
            <p className="auth-error">{errors.name}</p>
          ) : (
            <p>This is how your store will appear in the app.</p>
          )}
        </div>

        {!business && (
          <div>
            <label htmlFor="brand-name">Brand Name</label>
            <input
              id="brand-name"
              placeholder="Example: App Academy"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
            {errors.brand ? (
              <p className="auth-error">{errors.brand}</p>
            ) : (
              <p>
                We'll use this to help organize information that is shared
                across stores, such as menus.
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="business-type">Business Type</label>
          <select
            id="business-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option
              value=""
              hidden
            >
              Select...
            </option>
            <option>Restaurant</option>
            <option>Grocery Store</option>
          </select>
          <p className="auth-error">{errors.type}</p>
        </div>

        {type === "Restaurant" && (
          <div>
            <label htmlFor="cuisine">Cuisine</label>
            <select
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option
                value=""
                hidden
              >
                Select...
              </option>
              {cuisines.map((c, i) => (
                <option value={c}>{c}</option>
              ))}
            </select>
            <p className="auth-error">{errors.cuisine}</p>
          </div>
        )}

        {business && (
          <>
            <div>
              <label>Price Range</label>
              <div className="price-range-input flex">
                {["$", "$$", "$$$", "$$$$"].map((p, i) => (
                  <div className="flex">
                    <input
                      type="radio"
                      name="price-range"
                      id={p}
                      checked={p === priceRange}
                      onChange={(e) => setPriceRange(p)}
                      key={2 * i}
                    />
                    <label
                      htmlFor={p}
                      key={2 * i + 1}
                    >
                      {p}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="delivery">Delivery Price</label>
              <div className="delivery-input flex flex-01">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.01"
                  id="delivery"
                  value={String(deliveryFee)}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                />
                <span>${Number(deliveryFee).toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
        <button className="bt-black">Submit</button>
      </form>
    </div>
  );
}
