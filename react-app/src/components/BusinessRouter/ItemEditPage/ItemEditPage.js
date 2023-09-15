import "./ItemEditPage.css";

import { ConfirmDeleteModal, ConfirmModal } from "../../utils/ConfirmModal";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  selectSingleItem,
  thunkCreateItem,
  thunkDeleteItem,
  thunkGetOneItem,
  thunkUpdateItem,
} from "../../../store/items";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { selectCategories } from "../../../store/userBusinesses";
import { useModal } from "../../../context/Modal";

const defaultImage =
  "https://cdn.discordapp.com/attachments/723759214123679836/1129101930510172180/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

const ConfirmPriceModal = ({ name, onConfirm }) => {
  const ConfirmBody = (
    <div className="confirm-price">
      <h2>
        The price on <span className="modal-highlight">{name}</span> is set to
        $0. If you continue this item with be free.
      </h2>
    </div>
  );

  return (
    <ConfirmModal
      ConfirmBody={ConfirmBody}
      onConfirm={onConfirm}
      confirmText={"Continue"}
    />
  );
};

export default function ItemEditPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const imageRef = useRef();
  const { businessId, itemId } = useParams();
  const { setModalContent } = useModal();

  const isEditting = itemId;
  const item = useSelector(selectSingleItem);
  const categoriesObj = useSelector(selectCategories);
  const categories = Object.values(categoriesObj).sort(
    (a, b) => a.order - b.order
  );

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

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
    setPrice(item?.price || "");
    setCategoryId(item?.categoryId || 0);
  }, [item, isEditting]);

  const checkSubmit = (e) => {
    e.preventDefault();
    if (Number(price) === 0) {
      setModalContent(
        <ConfirmPriceModal
          name={name}
          onConfirm={handleSubmit}
        />
      );
    } else handleSubmit();
  };

  const handleChangeImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    if (FileReader) {
      let fr = new FileReader();
      fr.onload = () => {
        imageRef.current.src = fr.result;
      };
      fr.readAsDataURL(image);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSaving(true);

    const formData = new FormData();

    const itemObj = {
      id: item?.id,
      name,
      about,
      image,
      price,
      business_id: Number(businessId),
      category_id: Number(categoryId),
    };

    for (let [k, v] of Object.entries(itemObj)) formData.append(k, v);

    const res = await dispatch(
      isEditting ? thunkUpdateItem(formData) : thunkCreateItem(formData)
    );

    setErrors(res.errors || {});

    if (!res.errors && !isEditting)
      history.push(`/business/${businessId}/menu/items`);
    setIsSaving(false);
  };

  const onDelete = async () => {
    const res = await dispatch(thunkDeleteItem(item.id));
    if (!res.errors) history.push(`/business/${businessId}/menu/items`);
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
    <div className="">
      <form
        className="create-item-form flex-c"
        onSubmit={checkSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <header className="business-header">
          <Link to={`/business/${businessId}/menu/items`}>
            <i className="fa-solid fa-arrow-left ft-15"></i>
          </Link>
          <div className="item-actions flex">
            <button
              className="bt-pd"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="item-actions__save bt-black bt-pd"
              disabled={isSaving}
            >
              {isSaving ? <i className="fa-regular fa-circle"></i> : "Save"}
            </button>
          </div>
        </header>
        <div className="create-item__name">
          <input
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p className="auth-error">{errors.name}</p>
        </div>

        <div className="create-item__category flex flex-01 g10">
          <span>Category</span>
          <select
            id="create-item__category"
            className="bt-black"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option
              value={0}
              hidden
            >
              None
            </option>
            {categories.map((c) => (
              <option
                value={c.id}
                key={c.id}
              >
                {c.name}
              </option>
            ))}
          </select>
          {categoryId !== 0 && (
            <button
              id="delete-category"
              className="flex flex-11"
              onClick={() => setCategoryId(0)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
        {categoryId === 0 && (
          <p className="auth-error">
            This item will not be displayed unless it has a category
          </p>
        )}

        <div className="create-item__picture">
          <img
            src={image}
            alt=""
            ref={imageRef}
            onError={(e) => {
              e.target.src = defaultImage;
              e.target.style = "object-fit: contain";
            }}
            onLoad={(e) => {
              if (e.target.src !== defaultImage)
                e.target.style = "object-fit: cover";
            }}
          />
          <label htmlFor="image">
            Item Picture (<em>optional</em> )
          </label>
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleChangeImage}
          />
          <p className="auth-error">{errors.image}</p>
        </div>

        <div className="create-item__about">
          <label htmlFor="about">
            Description (<em>optional</em> )
          </label>
          <textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <p className="auth-error">{errors.about}</p>
        </div>

        <div className="create-item__price flex-c">
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
