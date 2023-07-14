import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";

import {
  thunkCreateItem,
  thunkGetOneItem,
  thunkDeleteItem,
} from "../../../store/items";
import ConfirmDeleteModal from "../../utils/ConfirmDeleteModal";
import "./CreateItemForm.css";

const defaultImage =
  "https://cdn.discordapp.com/attachments/723759214123679836/1129101930510172180/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

export default function CreateItemForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId, itemId } = useParams();
  const { setModalContent } = useModal();

  const item = useSelector((state) => state.items.singleItem);
  console.log(item);

  const [name, setName] = useState(item?.name || "");
  const [about, setAbout] = useState(item?.about || "");
  const [image, setImage] = useState(item?.image || "");
  const [imageText, setImageText] = useState(item?.image || "");
  const [price, setPrice] = useState(item?.price || 0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item && item.id === Number(itemId)) return;
    dispatch(thunkGetOneItem(itemId));
  }, [dispatch]);

  const isEditting = itemId;

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

  const onDelete = async () => {
    const res = await dispatch(thunkDeleteItem(item.id));
    if (!res.errors) history.push(`/business/${businessId}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setModalContent(
      <ConfirmDeleteModal
        deleteName={`${item.name}`}
        onDelete={onDelete}
      />
    );
  };

  if (!item || item.id !== Number(itemId)) return null;

  return (
    <form
      className="create-item-form pg-pd flex flex-c"
      onSubmit={handleSubmit}
    >
      <div className="item-actions">
        <button
          className="bt-pd"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="bt-black bt-pd">Save</button>
      </div>

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
    </form>
  );
}
