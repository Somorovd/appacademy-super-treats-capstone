import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import { thunkCreateBusiness } from "../../../store/businesses";
import "./CreateBusinessForm.css";

export default function CreateBusinessForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [type, setType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const business = {
      address,
      cuisine,
      name: businessName,
      type,
    };

    const res = await dispatch(thunkCreateBusiness(business));
    console.log(res);
    if (res.errors) setErrors(res.errors);
    else history.push(`/business/${res.business.id}`);
  };

  const validateForm = () => {
    const errors = {};

    if (address.trim() === "") errors.address = "Enter a store address";
    if (address.trim().length > 255)
      errors.address = "The maximum characters allowed is 255";

    if (businessName.trim() === "") errors.name = "Enter a store name";
    if (businessName.trim().length > 100)
      errors.address = "The maximum characters allowed is 100";

    if (brandName.trim() === "") errors.brand = "Enter a brand name";
    if (brandName.trim().length > 100)
      errors.address = "The maximum characters allowed is 100";

    if (type.trim() === "") errors.type = "Select a business type";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="create-business-page flex-c">
      <form
        className="create-business-form"
        onSubmit={handleSubmit}
      >
        <h2>Get Started</h2>

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
              We'll use this to help organize information that is shared across
              stores, such as menus.
            </p>
          )}
        </div>

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
              <option>BBQ</option>
              <option>Chinese</option>
            </select>
            <p className="auth-error">{errors.cuisine}</p>
          </div>
        )}
        <button className="bt-black">Submit</button>
      </form>
    </div>
  );
}
