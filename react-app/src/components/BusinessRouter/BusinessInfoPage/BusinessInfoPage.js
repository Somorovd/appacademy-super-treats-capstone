import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

import {
  thunkGetOneBusiness,
  thunkDeleteBusiness,
} from "../../../store/userBusinesses";
import ConfirmDeleteModal from "../../utils/ConfirmDeleteModal";
import "./BusinessInfoPage.css";

export default function BusinessInfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();
  const { setModalContent } = useModal();

  const business = useSelector((state) => state.userBusinesses.singleBusiness);

  useEffect(() => {
    dispatch(thunkGetOneBusiness(businessId));
  }, [dispatch]);

  const onDelete = async () => {
    const res = await dispatch(thunkDeleteBusiness(business.id));
    if (!res.errors) history.push("/business");
  };

  const handleDelete = () => {
    setModalContent(
      <ConfirmDeleteModal
        deleteName={`${business.name} on ${business.address}`}
        onDelete={onDelete}
      />
    );
  };

  if (!business) return <></>;

  return (
    <div className="business-info flex">
      <div className="business-info-nav fh"></div>
      <div className="business-info-content">
        <header className="business-info__header">
          <img
            className="business-info__image"
            src={business.image}
            alt=""
          />
          <div className="business-actions">
            <button>Edit Profile</button>
            <button
              className="bt-black"
              onClick={handleDelete}
            >
              Delete Business
            </button>
          </div>
        </header>
        <section className="business-profile">
          <h1 className="business-profile__name">{business.name}</h1>
          <p className="business-profile__address">{business.address}</p>
          <p>
            <span className="business-profile__rating">
              <i class="fa-solid fa-star"></i> {business.rating}
            </span>
            &bull;
            <span className="business-profile__type">
              {business.cuisine || business.type}
            </span>
            &bull;
            <span className="business-profile__price">
              {business.priceRange}
            </span>
            &bull;
            <span className="business-profile__delivery">
              ${business.deliveryFee} Delivery Fee
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
