import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { thunkCreateItem } from "../../../store/items";
import "./CreateItemForm.css";

const defaultImage =
  "https://cdn.discordapp.com/attachments/723759214123679836/1129101930510172180/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

export default function CreateItemForm() {
  const { businessId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [imageText, setImageText] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemObj = {
      name,
      about,
      image,
      price,
      business_id: Number(businessId),
    };

    const res = await dispatch(thunkCreateItem(itemObj));
    if (res.errors) setErrors(res.errors);
    else history.push(`/business/${businessId}`);
  };

  return (
    <form
      className="create-item-form pg-pd flex flex-c"
      onSubmit={handleSubmit}
    >
      <h2>Add a new item to your menu</h2>
      <div className="create-item__name">
        <input
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <p className="auth-error">{errors.name}</p>
      </div>

      <div className="create-item__picture">
        <img
          src={image}
          alt=""
          onError={(e) => {
            e.target.src = defaultImage;
            e.target.style = "object-fit: fill";
          }}
          onLoad={(e) => (e.target.style = "object-fit: cover")}
        />
        <label htmlFor="image">Item Picture</label>
        <input
          id="image"
          value={imageText}
          onChange={(e) => setImageText(e.target.value)}
          onBlur={(e) => setImage(e.target.value)}
        />
        <p className="auth-error">{errors.image}</p>
      </div>

      <div className="create-item__about">
        <label htmlFor="about">Description</label>
        <textarea
          id="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <p className="auth-error">{errors.about}</p>
      </div>

      <div className="create-item__price">
        <label htmlFor="price">Item Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={0}
          max={1000}
          step={0.01}
        />
        <p className="auth-error">{errors.price}</p>
      </div>

      <button className="bt-black bt-pd">Submit</button>
    </form>
  );
}
