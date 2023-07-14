import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { Link } from "react-router-dom";

import { thunkDeleteBusiness } from "../../../store/userBusinesses";
import ConfirmDeleteModal from "../../utils/ConfirmDeleteModal";
import CreateBusinessForm from "../CreateBusinessForm";
import ItemTableRow from "./ItemTableRow";
import "./BusinessInfoPage.css";

export default function BusinessInfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();
  const { closeModal, setModalContent, setModalClass } = useModal();

  const business = useSelector((state) => state.userBusinesses.singleBusiness);
  const itemIds = business.items;

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
    <div className="business-info-content">
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
      <section className="business-profile">
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
      <section>
        <div className="item-actions">
          <Link
            to={`/business/${businessId}/items/new`}
            className="add-item-button bt-black bt-pd"
          >
            <i className="fa-solid fa-plus"></i> Add Item
          </Link>
        </div>
        <table className="business-item-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Price</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {itemIds.map((i) => (
              <ItemTableRow
                itemId={i}
                key={i}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
