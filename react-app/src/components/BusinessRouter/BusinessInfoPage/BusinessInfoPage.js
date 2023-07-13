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
        <h1>{business.name}</h1>
        <button>Edit Business Details</button>
        <button
          className="bt-black"
          onClick={handleDelete}
        >
          Delete Business
        </button>
      </div>
    </div>
  );
}
