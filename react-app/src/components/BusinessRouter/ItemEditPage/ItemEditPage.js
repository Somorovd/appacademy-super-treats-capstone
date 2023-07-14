import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";

import {
  thunkGetOneItem,
  thunkCreateItem,
  thunkUpdateItem,
  thunkDeleteItem,
} from "../../../store/items";
import BusinessMenu from "../BusinessMenu";
import ConfirmDeleteModal from "../../utils/ConfirmDeleteModal";
import "./ItemEditPage.css";

const defaultImage =
  "https://cdn.discordapp.com/attachments/723759214123679836/1129101930510172180/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

export default function ItemEditPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId, itemId } = useParams();
  const { setModalContent } = useModal();

  const isEditting = itemId;
  const item = useSelector((state) => state.items.singleItem);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEditting) return;
    if (item && item.id === Number(itemId)) return;
    dispatch(thunkGetOneItem(itemId));
  }, [dispatch]);

  useEffect(() => {
    if (!isEditting) return;
    setId(item?.id || "");
    setName(item?.name || "");
    setAbout(item?.about || "");
    setImage(item?.image || "");
    setImageInput(item?.image || "");
    setPrice(item?.price || "");
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemObj = {
      id: item?.id,
      name,
      about,
      image,
      price,
      business_id: Number(businessId),
    };

    const res = await dispatch(
      isEditting ? thunkUpdateItem(itemObj) : thunkCreateItem(itemObj)
    );

    setErrors(res.errors || {});

    if (!res.errors && !isEditting)
      history.push(`/business/${businessId}/items/${res.item.id}`);
  };

  const onDelete = async () => {
    const res = await dispatch(thunkDeleteItem(item.id));
    if (!res.errors) history.push(`/business/${businessId}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (!isEditting) return history.push(`/business/${businessId}`);

    setModalContent(
      <ConfirmDeleteModal
        deleteName={`${item.name}`}
        onDelete={onDelete}
      />
    );
  };

  if (isEditting && (!item || id !== Number(itemId))) return null;

  return (
    <div className="business-info-content">
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
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
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
    </div>
  );
}
