import "./BusinessInfoPage.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { ConfirmDeleteModal } from "../../utils/ConfirmModal";
import CreateBusinessForm from "../CreateBusinessPage/CreateBusinessForm";
import { selectSingleBusiness } from "../../../store/businesses";
import { thunkDeleteBusiness } from "../../../store/userBusinesses";
import { useModal } from "../../../context/Modal";

export default function BusinessInfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();
  const { closeModal, setModalContent, setModalClass } = useModal();

  const business = useSelector(selectSingleBusiness);

  const onDelete = async () => {
    const res = await dispatch(thunkDeleteBusiness(business.id));
    if (!res.errors) history.push("/business");
  };

  const handleEdit = () => {
    setModalClass("flex flex-11");
    setModalContent(
      <CreateBusinessForm
        business={business}
        onSubmit={closeModal}
      />
    );
  };

  const handleDelete = () => {
    setModalContent(
      <ConfirmDeleteModal
        deleteName={`${business.name} on ${business.address}`}
        onDelete={onDelete}
      />
    );
  };

  if (!business || business.id !== Number(businessId)) return <></>;

  return (
    <div className="business-info-content no-pd">
      <header className="business-info__header">
        {business.image ? (
          <img
            className="business-info__image"
            src={business.image}
            alt=""
          />
        ) : (
          <div className="business-info__image"></div>
        )}
        <div className="business-actions fw fh flex flex-22">
          <button onClick={handleEdit}>Edit Profile</button>
          <button
            className="bt-black"
            onClick={handleDelete}
          >
            Delete Business
          </button>
        </div>
      </header>
      <section className="business-profile flex-c">
        <h1 className="business-profile__name">{business.name}</h1>
        <p className="business-profile__address">{business.address}</p>
        <p>
          <span className="business-profile__rating">
            <i className="fa-solid fa-star"></i> {business.rating}
          </span>
          &bull;
          <span className="business-profile__type">
            {business.cuisine || business.type}
          </span>
          &bull;
          <span className="business-profile__price">{business.priceRange}</span>
          &bull;
          <span className="business-profile__delivery">
            ${business.deliveryFee} Delivery Fee
          </span>
        </p>
      </section>
      <section></section>
    </div>
  );
}
